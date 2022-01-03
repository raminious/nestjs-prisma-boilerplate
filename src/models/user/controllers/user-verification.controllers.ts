import { Controller, Param, Post, Put, UseGuards } from '@nestjs/common'
import { UserPoliciesGuard } from '../guards/user-policies.guard'
import { UserService } from '../../../core/user/services/user.service'
import { CheckPolicies } from 'src/core/policies/decorators/policies.decorator'
import { Action } from 'src/constants/policies.actions'
import { UserAbility } from 'src/core/policies/decorators/ability.decorator'
import { AuthService } from 'src/core/authentication/services/auth.service'
import { Id } from 'src/utils/decorators/id.decorator'
import { AppAbility } from 'src/typings/ability'

@UseGuards(UserPoliciesGuard)
@Controller({
  path: 'users/verify',
})
export class UserVerificationController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('email/:id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'User'))
  async verifyEmailRequest(
    @UserAbility() ability: AppAbility,
    @Id() id: string,
  ) {
    await this.authService.sendEmailVerificationCode(ability, id)
  }

  @Put('email/:id/:token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'User'))
  async verifyEmail(
    @UserAbility() ability: AppAbility,
    @Id() id: string,
    @Param('token') token: string,
  ) {
    await this.authService.verifyEmail(ability, id, token)
  }
}

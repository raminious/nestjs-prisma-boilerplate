import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { Action } from 'src/constants/policies.actions'
import { UserAbility } from 'src/core/policies/decorators/ability.decorator'
import { CheckPolicies } from 'src/core/policies/decorators/policies.decorator'
import { UserPoliciesGuard } from '../guards/user-policies.guard'
import { UserService } from '../../../core/user/services/user.service'
import { UserUpdateDto } from '../dto/user-update.dto'
import { AppAbility } from 'src/typings/ability'
import { UserUpdatePasswordDto } from '../dto/user-update-password.dto'
import { AuthService } from 'src/core/authentication/services/auth.service'
import { Id } from 'src/utils/decorators/id.decorator'

@UseGuards(UserPoliciesGuard)
@Controller({
  path: 'users',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, 'User'))
  getAllUsers(
    @Query('limit', new DefaultValuePipe(50)) limit: number,
    @Query('start', new DefaultValuePipe(0)) start: number,
  ) {
    return this.userService.findAll({
      limit,
      start,
    })
  }

  @Put(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'User'))
  async updateUserById(
    @Id() id: string,
    @Body() userUpdateDto: UserUpdateDto,
    @UserAbility() ability: AppAbility,
  ) {
    return this.userService.updateById(ability, id, userUpdateDto)
  }

  @Put(':id/password')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'User'))
  async updateUserPassword(
    @Id() id: string,
    @Body() { current, password }: UserUpdatePasswordDto,
    @UserAbility() ability: AppAbility,
  ) {
    await this.authService.changePassword(ability, id, current, password)
  }
}

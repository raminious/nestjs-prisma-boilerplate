import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from 'src/core/authentication/guards/local-auth.guard'
import { UserEntity } from 'src/core/user/entity/user.entity'
import { AuthService } from 'src/core/authentication/services/auth.service'
import { Public } from '../decorators/auth-public.decorator'
import { UserSignupDto } from '../dto/user-signup.dto'
import { User } from '../decorators/user.decorator'
import { UserResetPasswordDto } from '../dto/user-reset-password.dto'
import { UserResetPasswordRequestDto } from '../dto/user-reset-password-request.dto'

@Controller('auth')
export class LocalAuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  loginUser(@User() user: UserEntity) {
    return this.authService.generateToken(user)
  }

  @Post('signup')
  @Public()
  async signupUser(@Body() userSignupDto: UserSignupDto) {
    return this.authService.signup(userSignupDto)
  }

  @Post('password/reset')
  @Public()
  async resetPasswordRequest(@Body() { email }: UserResetPasswordRequestDto) {
    await this.authService.sendPasswordResetCode(email)

    return {}
  }

  @Post('password/reset/:token')
  @Public()
  async resetPassword(
    @Body() { email, password }: UserResetPasswordDto,
    @Param('token') token: string,
  ) {
    await this.authService.resetPassword(email, password, token)

    return {}
  }
}

import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common'
import { AuthService } from 'src/core/authentication/services/auth.service'
import { DisableCache } from 'src/core/cache/decorators/disable-cache.decorator'
import { UserEntity } from 'src/core/user/entity/user.entity'
import { Public } from '../decorators/auth-public.decorator'
import { User } from '../decorators/user.decorator'
import { GoogleAuthGuard } from '../guards/google-auth.guard'

@DisableCache()
@Controller('auth/google')
export class GoogleAuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @Public()
  @UseGuards(GoogleAuthGuard)
  login() {
    /* empty */
  }

  @Get('redirect')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async redirect(@User() user: UserEntity) {
    if (!user) {
      throw new BadRequestException()
    }

    return this.authService.generateToken(user)
  }
}

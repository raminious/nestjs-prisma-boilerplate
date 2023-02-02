import { PassportStrategy } from '@nestjs/passport'
import { ConflictException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Strategy } from 'passport-google-oauth20'

import { AuthService } from '../services/auth.service'
import { UserEntity } from 'src/core/user/entity/user.entity'
import { PrismaService } from 'src/core/database/services/prisma.service'
import { HashService } from '../services/hash.service'
import { UserOrigin } from '@prisma/client'

interface GoogleProfile {
  emails: {
    value: string
  }[]
  name: {
    givenName: string
  }
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly hashService: HashService,
    private readonly prisma: PrismaService,
  ) {
    super({
      clientID: configService.get<string>('google.oauth.clientId'),
      clientSecret: configService.get<string>('google.oauth.clientSecret'),
      callbackURL: 'http://localhost:3000/v1/auth/google/redirect',
      scope: ['email', 'profile'],
    })
  }

  async validate(
    _: string,
    __: string,
    profile: GoogleProfile,
  ): Promise<UserEntity> {
    const email = profile.emails[0].value
    const name = profile.name.givenName

    let user = await this.authService.findUser({
      email,
    })

    if (user && user.origin !== 'Google') {
      throw new ConflictException({
        message: 'The email address is already registered in the system.',
      })
    }

    if (user && user.origin === 'Google') {
      return new UserEntity(user)
    }

    user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: await this.hashService.random(),
        origin: UserOrigin.Google,
        emailVerified: true,
        gender: null,
      },
    })

    return new UserEntity(user)
  }
}

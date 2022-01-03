import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { ConfigurationsModule } from '../configurations/configurations.module'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { PrismaService } from '../database/services/prisma.service'
import { EncryptionService } from './services/encryption.service'
import { HashService } from './services/hash.service'

import { LocalAuthController } from './controllers/local-auth.controller'
import { GoogleAuthController } from './controllers/google-auth.controller'
import { GoogleStrategy } from './strategies/google.strategy'
import { UserService } from '../user/services/user.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationsModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    AuthService,
    EncryptionService,
    HashService,
    UserService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [LocalAuthController, GoogleAuthController],
  exports: [AuthService],
})
export class AuthenticationModule {}

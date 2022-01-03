import { Module } from '@nestjs/common'
import { UserAbilityFactory } from './policies/user-ability.factory'
import { UserService } from '../../core/user/services/user.service'
import { UserController } from './controllers/user.controller'
import { PrismaService } from 'src/core/database/services/prisma.service'
import { UserVerificationController } from './controllers/user-verification.controllers'
import { AuthenticationModule } from 'src/core/authentication/auth.module'

@Module({
  imports: [AuthenticationModule],
  controllers: [UserController, UserVerificationController],
  providers: [UserService, UserAbilityFactory, PrismaService],
  exports: [UserService],
})
export class UserModelModule {}

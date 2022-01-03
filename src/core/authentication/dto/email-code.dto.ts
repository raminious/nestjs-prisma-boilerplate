import { UserTokenType } from '@prisma/client'
import { IsEmail, IsString } from 'class-validator'

export class UserResetPasswordDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  type: UserTokenType
}

import { IsEmail, IsString } from 'class-validator'

export class UserResetPasswordDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string
}

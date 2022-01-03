import { IsEmail, IsString } from 'class-validator'

export class UserResetPasswordRequestDto {
  @IsString()
  @IsEmail()
  email: string
}

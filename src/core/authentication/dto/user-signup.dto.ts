import { IsEmail, IsString } from 'class-validator'

export class UserSignupDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string
}

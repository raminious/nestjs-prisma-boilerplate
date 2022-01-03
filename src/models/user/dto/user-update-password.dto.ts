import { IsString } from 'class-validator'

export class UserUpdatePasswordDto {
  @IsString()
  current: string

  @IsString()
  password?: string
}

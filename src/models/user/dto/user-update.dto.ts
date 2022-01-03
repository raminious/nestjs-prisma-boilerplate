import { IsEnum, IsOptional, IsString } from 'class-validator'
import { Gender } from '@prisma/client'

export class UserUpdateDto {
  @IsString()
  name: string

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender | null
}

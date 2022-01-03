import { Gender } from '@prisma/client'
import { Exclude } from 'class-transformer'
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator'

export class UserEntity {
  @IsUUID()
  id: string

  @IsString()
  @MaxLength(20)
  @MinLength(2)
  name: string

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  email: string

  @IsNotEmpty()
  @Exclude()
  @MaxLength(30)
  @MinLength(6)
  password: string

  roles: string[]

  @IsString()
  gender: Gender

  @IsISO8601()
  created_at: Date | string

  @IsISO8601()
  updated_at: Date | string

  get isAdmin() {
    return this.roles?.includes('admin')
  }

  constructor(partial?: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}

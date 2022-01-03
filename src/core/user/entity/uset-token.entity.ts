import { UserTokenType } from '@prisma/client'
import { IsISO8601, IsString, IsUUID } from 'class-validator'

export class UserTokenEntity {
  @IsUUID()
  id: string

  @IsUUID()
  userId: string

  @IsString()
  code: string

  @IsString()
  type: UserTokenType

  @IsISO8601()
  created_at: Date | string

  constructor(partial?: Partial<UserTokenEntity>) {
    Object.assign(this, partial)
  }
}

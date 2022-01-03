import { Request } from 'express'
import { AppAbility, SubjectsAbility } from './ability'

export type HttpRequest<UserEntity, T = SubjectsAbility> = Request & {
  user: UserEntity
  ability: AppAbility<T>
}

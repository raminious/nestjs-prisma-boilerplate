import { UserEntity } from 'src/core/user/entity/user.entity'
import { AppAbility } from 'src/typings/ability'
import { HttpRequest } from 'src/typings/http-request'

export interface IPolicyHandler {
  handle(ability: AppAbility, request: HttpRequest<UserEntity>): boolean
}

export type PolicyHandlerCallback = (
  ability: AppAbility,
  request: HttpRequest<UserEntity>,
) => boolean

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback

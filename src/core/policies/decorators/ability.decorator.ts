import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from 'src/core/user/entity/user.entity'
import { HttpRequest } from 'src/typings/http-request'

export const UserAbility = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: HttpRequest<UserEntity> = ctx.switchToHttp().getRequest()

    return request.ability
  },
)

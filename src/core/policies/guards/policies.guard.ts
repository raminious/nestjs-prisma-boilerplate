import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserEntity } from 'src/core/user/entity/user.entity'
import { HttpRequest } from 'src/typings/http-request'

import { AbilityFactory } from '../factories/ability.factory'
import { CHECK_POLICIES_KEY } from '../constants/policies.constants'

import type { SubjectsAbility } from 'src/typings/ability'
import type { PolicyHandler } from '../types'

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly ability: AbilityFactory<SubjectsAbility>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.getAllAndOverride<PolicyHandler[]>(CHECK_POLICIES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || []

    const request: HttpRequest<UserEntity> = context.switchToHttp().getRequest()
    const { user } = request

    request.ability = this.ability.defineAbilityFor(user)

    return policyHandlers.every(handler =>
      this.execPolicyHandler(handler, request),
    )
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    request: HttpRequest<UserEntity>,
  ) {
    if (typeof handler === 'function') {
      return handler(request.ability, request)
    }

    return handler.handle(request.ability, request)
  }
}

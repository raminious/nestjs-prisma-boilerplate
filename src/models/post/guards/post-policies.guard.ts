import { CanActivate, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PoliciesGuard } from 'src/core/policies/guards/policies.guard'

import { PostAbilityFactory } from '../policies/post-ability.factory'

@Injectable()
export class UserPoliciesGuard extends PoliciesGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly postAbilityFactory: PostAbilityFactory,
  ) {
    super(reflector, postAbilityFactory)
  }
}

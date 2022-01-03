import { CanActivate, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PoliciesGuard } from 'src/core/policies/guards/policies.guard'

import { UserAbilityFactory } from '../policies/user-ability.factory'

@Injectable()
export class UserPoliciesGuard extends PoliciesGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly userAbilityFactory: UserAbilityFactory,
  ) {
    super(reflector, userAbilityFactory)
  }
}

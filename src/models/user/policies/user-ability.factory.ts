import { Injectable } from '@nestjs/common'

import { Action } from 'src/constants/policies.actions'
import { AbilityFactory } from 'src/core/policies/factories/ability.factory'
import { SubjectsAbility } from 'src/typings/ability'
import { UserEntity } from '../../../core/user/entity/user.entity'

@Injectable()
export class UserAbilityFactory extends AbilityFactory<SubjectsAbility> {
  defineAbilityFor(user: UserEntity) {
    const { can, cannot } = this.AbilityBuilder

    if (user.isAdmin) {
      can(Action.Manage, 'User', 'all')
    }

    can(Action.Read, 'User', {
      id: user.id,
    })

    can(Action.Update, 'User', {
      id: user.id,
    })

    cannot(Action.Delete, 'User', {
      id: user.id,
    })

    return this.build()
  }
}

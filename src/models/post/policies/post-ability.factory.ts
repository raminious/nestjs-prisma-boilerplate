import { Injectable } from '@nestjs/common'

import { Action } from 'src/constants/policies.actions'
import { AbilityFactory } from 'src/core/policies/factories/ability.factory'
import { SubjectsAbility } from 'src/typings/ability'
import { UserEntity } from '../../../core/user/entity/user.entity'

@Injectable()
export class PostAbilityFactory extends AbilityFactory<SubjectsAbility> {
  defineAbilityFor(user: UserEntity) {
    const { can, cannot } = this.AbilityBuilder

    if (user.isAdmin) {
      can(Action.Manage, 'Post', 'all')
    }

    can(Action.Read, 'Post', {
      id: user.id,
    })

    can(Action.Update, 'Post', {
      id: user.id,
    })

    cannot(Action.Delete, 'Post', {
      id: user.id,
    })

    cannot(Action.Read, 'Post', {
      published: false,
    })

    return this.build()
  }
}

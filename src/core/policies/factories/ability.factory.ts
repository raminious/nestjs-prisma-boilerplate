import { AbilityBuilder, AbilityClass } from '@casl/ability'
import { PrismaAbility } from '@casl/prisma'
import { Injectable } from '@nestjs/common'
import { UserEntity } from 'src/core/user/entity/user.entity'
import { AppAbility, SubjectsAbility } from 'src/typings/ability'

@Injectable()
export abstract class AbilityFactory<T = SubjectsAbility> {
  private abilityBuilder: AbilityBuilder<AppAbility<T>>

  constructor() {
    this.abilityBuilder = new AbilityBuilder<AppAbility<T>>(
      PrismaAbility as AbilityClass<AppAbility<T>>,
    )
  }

  protected get AbilityBuilder() {
    return this.abilityBuilder
  }

  protected build() {
    return this.abilityBuilder.build()
  }

  public abstract defineAbilityFor(user: UserEntity): AppAbility<T>
}

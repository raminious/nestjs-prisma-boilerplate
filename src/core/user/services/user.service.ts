import { subject } from '@casl/ability'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Action } from 'src/constants/policies.actions'
import { PrismaService } from 'src/core/database/services/prisma.service'
import { UserUpdateDto } from 'src/models/user/dto/user-update.dto'
import { AppAbility } from 'src/typings/ability'
import type { UUID } from 'src/typings/common'
import { UserEntity } from '../entity/user.entity'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async checkAccess(
    ability: AppAbility,
    condition: Prisma.UserWhereUniqueInput,
  ) {
    const user = await this.prisma.user.findUnique({
      where: condition,
    })

    if (!user || ability.can(Action.Update, subject('User', user)) === false) {
      throw new UnauthorizedException()
    }

    return user
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findAll(
    { limit, start } = {
      limit: 50,
      start: 0,
    },
  ) {
    const [total, list] = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        take: Math.min(limit, 50),
        skip: start,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])

    return {
      info: {
        limit: Math.min(limit, total),
        start,
        total,
      },
      data: list.map(user => new UserEntity(user)),
    }
  }

  async updateById(ability: AppAbility, id: UUID, dto: UserUpdateDto) {
    await this.checkAccess(ability, {
      id,
    })

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        gender: dto.gender,
      },
    })
  }
}

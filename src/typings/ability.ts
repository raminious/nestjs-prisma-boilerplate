import { User, UserToken, Post } from '@prisma/client'
import { PrismaAbility, Subjects } from '@casl/prisma'

export type SubjectsAbility = Subjects<{
  User: User
  UserToken: UserToken
  Post: Post
}>

export type AppAbility<T = SubjectsAbility> = PrismaAbility<[string, T]>

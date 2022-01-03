import { Module } from '@nestjs/common'
import { PrismaService } from 'src/core/database/services/prisma.service'
import { PostController } from './controllers/post.controller'
import { PostAbilityFactory } from './policies/post-ability.factory'
import { PostService } from './services/post.service'

@Module({
  controllers: [PostController],
  providers: [PostService, PostAbilityFactory, PrismaService],
})
export class PostModelModule {}

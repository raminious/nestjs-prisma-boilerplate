import { Controller, Get, Param } from '@nestjs/common'
import { DisableCache } from 'src/core/cache/decorators/disable-cache.decorator'
import { UUID } from 'src/typings/common'

@Controller('posts')
export class PostController {
  @Get('/')
  getAllPosts() {
    return {
      posts: [],
    }
  }

  @Get(':id')
  @DisableCache()
  getPost(@Param('id') id: UUID) {
    return {
      id: id,
    }
  }
}

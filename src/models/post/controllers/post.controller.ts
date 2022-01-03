import { Controller, Get } from '@nestjs/common'

@Controller('posts')
export class PostController {
  @Get(':id')
  getPost() {
    return {}
  }
}

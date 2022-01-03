import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/core/database/services/prisma.service'

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: string) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    })
  }
}

import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { PrismaService } from '../database/services/prisma.service'
import { HealthController } from './controllers/health.controller'
import { PrismaHealthIndicator } from './indicators/prisma.health'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [PrismaHealthIndicator, PrismaService],
})
export class HealthModule {}

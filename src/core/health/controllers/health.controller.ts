import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common'
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus'
import { Public } from 'src/core/authentication/decorators/auth-public.decorator'

import { PrismaHealthIndicator } from '../indicators/prisma.health'

@Controller({
  path: 'health',
  version: VERSION_NEUTRAL,
})
export class HealthController {
  constructor(
    private db: PrismaHealthIndicator,
    private health: HealthCheckService,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  check() {
    return this.health.check([
      () => this.db.isHealthy('db'),
      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          thresholdPercent: 0.7,
        }),
      () => this.memory.checkHeap('memory_heap', 512 * 1024 * 1024), // 512MB,
      () => this.memory.checkRSS('memory_rss', 512 * 1024 * 1024),
    ])
  }
}

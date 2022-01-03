import { ThrottlerGuard } from '@nestjs/throttler'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    return Array.isArray(req.ips) ? req.ips[0] : req.ip
  }
}

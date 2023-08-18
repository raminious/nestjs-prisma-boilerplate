import { ExecutionContext } from '@nestjs/common'
import { DISABLE_CACHE_KEY } from '../decorators/disable-cache.decorator'
import { CacheInterceptor as NestCacheInterceptor } from '@nestjs/cache-manager'

export class CacheInterceptor extends NestCacheInterceptor {
  protected isRequestCacheable(context: ExecutionContext): boolean {
    const http = context.switchToHttp()
    const request = http.getRequest()

    if (request.method !== 'GET') {
      return false
    }

    const isCacheDisabled: boolean = this.reflector.getAllAndOverride(
      DISABLE_CACHE_KEY,
      [context.getHandler(), context.getClass()],
    )

    return !isCacheDisabled
  }
}

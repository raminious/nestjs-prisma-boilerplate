import { SetMetadata } from '@nestjs/common'

export const DISABLE_CACHE_KEY = 'cache-is-disabled'

export function DisableCache() {
  return SetMetadata(DISABLE_CACHE_KEY, true)
}

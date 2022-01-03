import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'auth-is-public'

export function Public() {
  return SetMetadata(IS_PUBLIC_KEY, true)
}

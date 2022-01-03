import { SetMetadata } from '@nestjs/common'
import { CHECK_POLICIES_KEY } from '../constants/policies.constants'
import { PolicyHandler } from '../types'

export function CheckPolicies(...handlers: PolicyHandler[]) {
  return SetMetadata(CHECK_POLICIES_KEY, handlers)
}

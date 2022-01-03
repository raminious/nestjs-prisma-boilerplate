import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseTimeInterceptor } from './interceptors/response-time.interceptor'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor,
    },
  ],
})
export class ResponseTimeModule {}

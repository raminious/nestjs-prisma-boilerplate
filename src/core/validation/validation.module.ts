import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { ValidationPipe } from './pipes/validation.pipe'

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class ValidationModule {}

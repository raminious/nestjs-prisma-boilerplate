import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { BodyTrimTransformPipe } from './pipes/trim.pipe'

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: BodyTrimTransformPipe,
    },
  ],
})
export class BodyTransformModule {}

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configurations from './factories/configurations.factory'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true,
    }),
  ],
})
export class ConfigurationsModule {}

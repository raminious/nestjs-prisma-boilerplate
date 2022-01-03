import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import compression from 'compression'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  app.use(compression())

  await app.listen(process.env.PORT || 3000)
}
bootstrap()

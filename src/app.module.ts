import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { AuthenticationModule } from './core/authentication/auth.module'
import { RateLimitModule } from './core/rate-limit/rate-limit.module'
import { HttpExceptionsModule } from './core/exceptions/exceptions.module'
import { ValidationModule } from './core/validation/validation.module'
import { ResponseTimeModule } from './core/response-time/response-time.module'
import { ConfigurationsModule } from './core/configurations/configurations.module'
import { DatabaseModule } from './core/database/database.module'
import { BodyTransformModule } from './core/body-transform/body-transform.module'

import { UserModelModule } from './models/user/user.module'
import { PostModelModule } from './models/post/post.module'
import { HealthModule } from './core/health/health.module'

@Module({
  imports: [
    // Models
    UserModelModule,
    PostModelModule,

    // Core Modules
    AuthenticationModule,
    DatabaseModule,
    RateLimitModule,
    HttpExceptionsModule,
    ValidationModule,
    ResponseTimeModule,
    ConfigurationsModule,
    BodyTransformModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}

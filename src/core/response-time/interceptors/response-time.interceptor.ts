import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse()
        response.header('X-Response-Time', Date.now() - now)
      }),
    )
  }
}

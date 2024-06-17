import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'



interface data<T> {
  data: T
}

@Injectable()
export class InterceptorInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<data<T>> {
    return next.handle().pipe(map(data => ({
      data,
      code: 200,
      success: true,
      message: '请求成功'
    })))
  }
}

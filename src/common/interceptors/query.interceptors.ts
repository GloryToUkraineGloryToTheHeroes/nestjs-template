import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

function transformQueryToNestedObject(query: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      const keys = key.split('.');
      let currentLevel: unknown = result;

      keys.forEach((nestedKey, index) => {
        if (index === keys.length - 1) {
          currentLevel[nestedKey] = query[key];
        } else {
          currentLevel[nestedKey] = currentLevel[nestedKey] || {};
          currentLevel = currentLevel[nestedKey];
        }
      });
    }
  }

  return result;
}

@Injectable()
export class TransformQueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();

    request.query = transformQueryToNestedObject(request.query);

    return next.handle().pipe(map((data) => data));
  }
}

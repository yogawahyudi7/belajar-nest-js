import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ApiResponse {
  code: number;
  message: string;
  error: any;
  data: any;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        let message = 'Success';
        switch (statusCode) {
          case 200:
            message = 'Success';
            break;
          case 400:
            message = 'Bad Request';
            break;
          case 500:
            message = 'Internal Server Error';
            break;
          default:
            message = 'Success';
        }

        return {
          code: statusCode,
          message,
          data,
          error: null,
        };
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        let message = 'Internal Server Error';
        switch (statusCode) {
          case 400:
            message = 'Bad Request';
            break;
          case 500:
            message = 'Internal Server Error';
            break;
          default:
            message = 'Error';
        }

        return throwError(() => ({
          code: statusCode,
          message,
          data: null,
          error: error.message || error,
        }));
      }),
    );
  }
}

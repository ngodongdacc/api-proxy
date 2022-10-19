import { CallHandler, CanActivate, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  time: Date;
}

export const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };

@Injectable()
export class MockTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle();
  }
}

export const mockHeader = {
  axonize_api_access_token: 'test',
};

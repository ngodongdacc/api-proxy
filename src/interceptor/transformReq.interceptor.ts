import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { isArray, isNumber } from 'class-validator';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  time: Date;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  checkCountdata = (data) => {
    let count;
    if (!isArray(data)) {
      count = undefined;
    } else if (isArray(data) && isNumber(data[1])) {
      count = data[1];
    } else {
      count = data.length;
    }
    return count;
  };
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        reqId: context.switchToHttp().getRequest().reqId,
        message: (data && data.message) || undefined,
        // if the data is array, check if data[1] is number, the response from ssa-school, else the response from auth0 or an object.
        data: isArray(data) && isNumber(data[1]) ? data[0] : data,
        // if data is object, no need to count. otherwise, check if the response from ssa-school or auth0 as above to get the length.
        count: this.checkCountdata(data),
        time: new Date(),
      })),
      catchError((err) =>
        throwError(
          () =>
            new HttpException(
              {
                statusCode: err.status,
                message: err.response,
                time: new Date(),
              },
              err.status,
            ),
        ),
      ),
    );
  }
}

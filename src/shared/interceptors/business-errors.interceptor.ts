/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { BussinessError } from '../errors/bussiness-errors';

@Injectable()
export class BusinessErrorsInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
     return next.handle()
       .pipe(catchError(error => {
         if (error.error === BussinessError.NOT_FOUND)
             throw new HttpException(error.message, HttpStatus.NOT_FOUND);
         else if (error.error === BussinessError.PRECONDITION_FAILED)
             throw new HttpException(error.message, HttpStatus.PRECONDITION_FAILED);
         else if (error.error === BussinessError.BAD_REQUEST)
             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
         else if (error.error === BussinessError.CONFLICT)
             throw new HttpException(error.message, HttpStatus.CONFLICT);
        else if (error.error === BussinessError.INTERNAL_SERVER_ERROR)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        else if (error.error === BussinessError.UNAUTHORIZED)
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        else if (error.error === BussinessError.LOCKED)
            throw new HttpException(error.message, HttpStatus.LOCKED);
        else if (error.error === BussinessError.FORBIDDEN)
            throw new HttpException(error.message, HttpStatus.FORBIDDEN);
         else
            console.error('Error no manejado por el interceptor de errores de negocio: ', error);
             throw error;
       }));
   }
}
/* archivo: src/shared/interceptors/business-errors.interceptor.ts */
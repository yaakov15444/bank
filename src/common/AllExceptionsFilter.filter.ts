// 📁 src/common/filters/all-exceptions.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './AppError';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof AppError
        ? exception.status
        : exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    const message = exception.message || 'Unexpected error';

    response.status(status).json({
      status,
      message,
      error: exception.error || {},
    });
  }
}

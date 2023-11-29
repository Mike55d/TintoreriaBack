import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { LogsService } from '../logs/logs.service';
import { LogLevel } from '../logs/logs.types';
import { CustomError } from './custom-error';
import { Errors } from './errors.types';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logService: LogsService) {
    this.logService.setContext('HttpExceptionFilter');
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let result: CustomError;
    // process Custom Errors
    if (exception instanceof CustomError) {
      result = exception;
    }
    // process nest built-in HttpException
    else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      result = new CustomError(Errors.INTERNAL_ERROR, {
        httpError: status,
        errorCode: status,
        title: exception.message
      });
    }
    // process typeorm's EntityNotFoundError exception
    else if (exception instanceof EntityNotFoundError) {
      result = new CustomError(Errors.RESOURCE_NOT_FOUND);
    }
    // process typeorm's QueryFailedError exception
    else if (exception instanceof QueryFailedError) {
      if (exception.driverError.code === 'ER_DUP_ENTRY') {
        result = new CustomError(Errors.ENTITY_ALREADY_EXISTS);
      } else if (exception.driverError.code.startsWith('ER_NO_REFERENCED_ROW')) {
        result = new CustomError(Errors.RESOURCE_NOT_FOUND);
      } else {
        result = new CustomError(Errors.INTERNAL_ERROR);
      }
    } else {
      result = new CustomError(Errors.INTERNAL_ERROR);
    }

    /**
     * @todo Modificar el llamado a logCustom para dar la mayor 
     *       cantidad de detalles posibles acerca del error
     */
    this.logService.logCustom(LogLevel.ERROR, result);

    response.status(result.httpError).json({
      statusCode: result.httpError,
      errorName: result.title,
      error: result.errorCode,
      message: result.details?.message,
      reason: result.details?.reason,
      field: result.details?.field,
      value: result.details?.value,
      url: request.url
    });
  }
}

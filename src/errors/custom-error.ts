import { HttpException, HttpStatus } from '@nestjs/common';
import { LogCategory, LogSubCategory } from '../logs/logs.types';
import { ErrorInterface } from './errors.types';

export class CustomError extends HttpException {
  title: string;
  errorCode: number;
  httpError: HttpStatus;
  logCategory: LogCategory;
  logSubCategory: LogSubCategory;
  details?: Record<string, any>;
  description?: string;

  constructor(error: ErrorInterface, override: Partial<ErrorInterface> = {}) {
    const final = {
      ...error,
      ...override
    };
    super(final, final.httpError);
    this.httpError = final.httpError;
    this.title = final.title;
    this.errorCode = final.errorCode;
    this.logCategory = final.logCategory;
    this.logSubCategory = final.logSubCategory;
    this.details = final.details;
    this.description = final.description;
  }
}

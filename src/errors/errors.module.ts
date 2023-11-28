import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LogsModule } from '../logs/logs.module';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [LogsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class ErrorsModule {}

import { Injectable, Scope, LoggerService } from '@nestjs/common';
import path from 'path';
import winston, { createLogger, Logger } from 'winston';
import * as packageJson from '../../package.json';
import ElectronLog from 'electron-log';
import { utilities as NestWinstonUtilities } from 'nest-winston';
import { CustomError } from '../errors/custom-error';
import { LogCategory, LogLevel, LogSubCategory } from './logs.types';
import { Repository } from 'typeorm';
import { Log } from './entities/logs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';

@Injectable({ scope: Scope.TRANSIENT })
export class LogsService implements LoggerService {
  private standardLogger: Logger = null;
  private operationLogger: Logger = null;
  private serverLogger: Logger = null;
  private currentContext: string = null;

  constructor(
    @InjectRepository(Log)
    private readonly logsRepository: Repository<Log>
  ) {
    const logDir = path.dirname(ElectronLog.transports.file.getFile().path);

    this.standardLogger = createLogger({
      levels: winston.config.syslog.levels,
      transports: [
        new winston.transports.File({
          filename: path.join(logDir, 'main.log'),
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.prettyPrint()
          )
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            NestWinstonUtilities.format.nestLike(packageJson.name)
          )
        })
      ]
    });

    this.serverLogger = createLogger({
      levels: winston.config.syslog.levels,
      transports: [
        new winston.transports.File({
          filename: path.join(logDir, 'server-error.log'),
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.prettyPrint()
          )
        })
      ]
    });
  }

  log(message: string, ...details: any[]) {
    let context = this.currentContext;

    if (!context && details.length && typeof details[0] === 'string') {
      context = details[0];
      details.shift();
    }

    this.standardLogger.log('info', message, {
      context,
      ...details
    });
  }

  error(message: string, ...details: any[]) {
    this.serverLogger.error(message, {
      context: this.currentContext || '<No context>',
      ...details
    });
  }

  warn(message: string, ...details: any[]) {
    this.serverLogger.log('warning', message, {
      context: this.currentContext || '<No context>',
      ...details
    });
  }

  async logCustom(level: LogLevel, error: CustomError) {
    const { message, ...subError } = error;

    if (error.logCategory === LogCategory.SERVER) {
      if (level >= LogLevel.WARN) {
        this.serverLogger.log('error', message, {
          context: this.currentContext || '<No context>',
          ...subError
        });
      } else {
        this.standardLogger.log('info', message, {
          context: this.currentContext || '<No context>',
          ...subError
        });
      }
    }

    const newLog = this.logsRepository.create({
      category: error.logCategory,
      subCategory: error.logSubCategory,
      title: error.title,
      message,
      errorNum: error.errorCode,
      level: level,
      details: error.details
    });

    try {
      await this.logsRepository.save(newLog);
    } catch (e) {
      this.serverLogger.log('crit', 'Unable to log to database', {
        context: 'LogsService',
        originalError: subError,
        dbException: e,
        organization: null
      });
    }
  }

  setContext(context: string) {
    this.currentContext = context;
  }

  create(id: string, req: Request, resLog: any) {
    try {
      const user = req.user as User;
      const newLog = this.logsRepository.create({
        level: LogLevel.INFO,
        category: LogCategory.GENERIC,
        subCategory: LogSubCategory.GENERIC,
        details: {
          request: {
            body: req.body,
            Headers: req.rawHeaders,
            path: req.originalUrl,
            user: user,
            method: req.method
          },
          idReq: id,
          response: { ...resLog }
        },
        message: 'Api Request',
        logId: id,
        statusResponse: resLog.statusCode,
        user_email: user ? user?.email : null,
        method: req.method
      });
      return this.logsRepository.save(newLog);
    } catch (error) {
      console.log(error);
    }
  }
}

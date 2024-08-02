import { Injectable, Scope, LoggerService } from '@nestjs/common';
import path from 'path';
import winston, { createLogger, Logger } from 'winston';
import * as packageJson from '../../package.json';
import ElectronLog from 'electron-log';
import { utilities as NestWinstonUtilities } from 'nest-winston';
import { CustomError } from '../errors/custom-error';
import { LogCategory, LogLevel, LogSubCategory } from './logs.types';
import { Between, Repository } from 'typeorm';
import { Log } from './entities/logs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { Session } from '../sessions/entities/session.entity';
import { FindLogsDto } from './dto/find-logs.dto';

@Injectable({ scope: Scope.TRANSIENT })
export class LogsService implements LoggerService {
  private standardLogger: Logger = null;
  private operationLogger: Logger = null;
  private serverLogger: Logger = null;
  private currentContext: string = null;

  constructor(
    @InjectRepository(Log)
    private readonly logsRepository: Repository<Log>,
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>
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

  async logCustom(level: LogLevel, error: CustomError, idLog?: string) {
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
    try {
      if (idLog) {
        const log = await this.logsRepository.findOneBy({ logId: idLog });
        log.category = error.logCategory;
        log.subCategory = error.logSubCategory;
        log.title = error.title;
        log.message = message;
        log.errorNum = error.errorCode;
        log.level = level;
        await this.logsRepository.save(log);
      } else {
        const newLog = this.logsRepository.create({
          category: error.logCategory,
          subCategory: error.logSubCategory,
          title: error.title,
          message,
          errorNum: error.errorCode,
          level: level,
          details: error.details,
          logId: idLog
        });
        await this.logsRepository.save(newLog);
      }
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

  async create(id: string, req: Request, resBody?: any, statusRes?: number) {
    try {
      const token = req?.headers?.authorization?.split(' ')[1];
      const entity = req?.originalUrl?.split('/')[2]?.split('?')[0];
      const session = await this.sessionsRepository.findOne({
        where: { token },
        relations: ['user']
      });
      const user = req.user as User;
      const newLog = this.logsRepository.create({
        level: LogLevel.INFO,
        category: LogCategory.GENERIC,
        subCategory: LogSubCategory.GENERIC,
        details: {
          request: {
            // body: req.body,
            // Headers: req.rawHeaders,
            path: req.originalUrl,
            user: user?.email,
            method: req.method
          },
          idReq: id,
          // response: {
          //   body: entity == 'logs' ? {} : resBody
          // }
        },
        message: 'Api request successful',
        logId: id,
        user_email: session ? session.user?.email : null,
        method: req.method,
        entity,
        statusResponse: statusRes.toString()
      });
      return await this.logsRepository.save(newLog);
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(logId: string) {
    try {
      return await this.logsRepository.findOneBy({ logId });
    } catch (error) {
      console.log(error);
    }
  }

  findAll(query: FindLogsDto) {
    try {
      const { skip, take, entity, method, user, from, to } = query;
      const logs = this.logsRepository.find({
        skip,
        take,
        where: {
          entity,
          method,
          user_email: user,
          regDate: Between(from, to)
        }
      });
      return logs;
    } catch (error) {
      // console.log(error);
    }
  }
}

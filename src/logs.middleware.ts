import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { LogsService } from './logs/logs.service';

export const LOG_ID_HEADER = 'X-Log-Id';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  constructor(private readonly logsService: LogsService) {}

  async use(req: any, res: any, next: NextFunction) {
    const id = uuid();
    res.set(LOG_ID_HEADER, id);
    const originalJson = res.json;
    const logsService = this.logsService;
    res.json = async function (body) {
      const statusCode = res.statusCode;
      originalJson.call(this, body);
      const log = await logsService.create(id, req, body, statusCode);
      return body;
    };
    setTimeout(async () => {
      const log = await logsService.findOne(id);
      if (!log) {
        logsService.create(id, req, {}, res.statusCode);
      }
    }, 1000);
    next();
  }
}

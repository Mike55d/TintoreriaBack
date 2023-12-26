import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { LogsService } from './logs/logs.service';

export const LOG_ID_HEADER = 'X-Log-Id';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  constructor(private readonly logsService: LogsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.getResponseLog(req, res);
    next();
  }

  getResponseLog = (req: Request, res: Response) => {
    const rawResponse = res.write;
    const rawResponseEnd = res.end;
    const chunkBuffers = [];
    res.write = (...chunks) => {
      const resArgs = [];
      for (let i = 0; i < chunks.length; i++) {
        resArgs[i] = chunks[i];
        if (!resArgs[i]) {
          res.once('drain', res.write);
          i--;
        }
      }
      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }
      return rawResponse.apply(res, resArgs);
    };
    // console.log(`Done writing, beginning res.end`);
    res.end = (...chunk) => {
      const resArgs = [];
      for (let i = 0; i < chunk.length; i++) {
        resArgs[i] = chunk[i];
      }
      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }
      const body = Buffer.concat(chunkBuffers).toString('utf8');
      // res.setHeader('origin', 'restjs-req-res-logging-repo');
      let bodyParsed;
      try {
        bodyParsed = JSON.parse(body);
      } catch (error) {
        bodyParsed = body;
      }
      const responseLog = {
        statusCode: res.statusCode,
        body: bodyParsed,
        headers: res.getHeaders()
      };
      // console.log('res: ', responseLog);
      rawResponseEnd.apply(res, resArgs);
      const id = uuid();
      this.logsService.create(id, req, responseLog);
      req[LOG_ID_HEADER] = id;
      return responseLog as unknown as Response;
    };
  };
}

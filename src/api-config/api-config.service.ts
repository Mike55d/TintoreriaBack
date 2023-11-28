import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Options as MulterOptions } from 'multer';
import { v4 as uuid } from 'uuid';

import path from 'path';
import fs from 'fs';
import multer from 'multer';

@Injectable()
export class ApiConfigService {
  private filesDestPath: string;
  constructor(private configService: ConfigService) {
    this.filesDestPath = path.join(
      process.env.HOME || process.env.USERPROFILE,
      this.configService.get<string>('RELATIVE_DEST_FILES')
    );
    if (!fs.existsSync(this.filesDestPath)) {
      fs.mkdirSync(this.filesDestPath, { recursive: true });
    }
  }

  get filesDest(): string {
    return this.filesDestPath;
  }

  private getMulterStorage() {
    const storage = multer.diskStorage({
      destination: this.filesDestPath,
      filename: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, `${uuid()}${ext}`);
      }
    });
    return storage;
  }

  getMulterOptions(): MulterOptions {
    return {
      storage: this.getMulterStorage(),
      limits: {
        fileSize: this.configService.get<number>('MAX_FILE_SIZE')
      }
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile
} from '@nestjs/common';
import { ImportExcelService } from './import-excel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response as ResponseExpress } from 'express';
import { createReadStream } from 'fs';
import { homedir } from 'os';
import path from 'path';

@Controller('import-excel')
export class ImportExcelController {
  constructor(private readonly importExcelService: ImportExcelService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    return await this.importExcelService.importProducts(file);
  }

  @Get('/importTickets')
  importTicketsGlpi() {
    return this.importExcelService.importTicketsGlpi();
  }

  @Get('tickets-to-excel')
  async reworkFile(@Res({ passthrough: true }) res: ResponseExpress) {
    let fileName = await this.importExcelService.ticketsToExcel();
    res.set({
      'Content-Disposition': `attachment; filename="${fileName}"`
    });
    const fileToStream = createReadStream(path.join(homedir(), process.env.REPORTS_PATH, fileName));
    return new StreamableFile(fileToStream);
  }

  @Get()
  findAll() {
    return this.importExcelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importExcelService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importExcelService.remove(+id);
  }
}

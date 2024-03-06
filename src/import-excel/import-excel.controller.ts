import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { ImportExcelService } from './import-excel.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('import-excel')
export class ImportExcelController {
  constructor(private readonly importExcelService: ImportExcelService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    return await this.importExcelService.importProducts(file);
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

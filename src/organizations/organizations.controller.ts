import {
  Controller,
  Get,
  Body,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
  StreamableFile,
  Response
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { ApiTags } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import path from 'path';
import { homedir } from 'os';
import * as mime from 'mime-types';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

@Controller('organizations')
@ApiTags('organizations')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post('toolbar')
  @UseInterceptors(AnyFilesInterceptor())
  async updateToolbar(
    @Body() updateToolbar,
    @UploadedFiles() files: Array<Express.Multer.File> = []
  ) {
    try {
      const payload = files.length ? JSON.parse(updateToolbar.payload) : updateToolbar;
      return await this.organizationsService.updateToolbar(payload, files);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id/logo')
  async getLogo(@Param('id') id: string, @Response({ passthrough: true }) res) {
    try {
      const fileName = await this.organizationsService.getLogo(id);
      res.set({
        'Content-Type': mime.lookup(fileName),
        'Content-Disposition': `attachment; filename="${fileName}"`
      });
      if (fileName == '') return;
      const fileToStream = createReadStream(path.join(homedir(), process.env.LOGOS_PATH, fileName));
      return new StreamableFile(fileToStream);
    } catch (error) {
      console.log(error);
    }
  }

}

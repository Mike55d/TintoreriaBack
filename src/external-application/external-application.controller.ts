import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExternalApplicationService } from './external-application.service';
import { CreateExternalApplicationDto } from './dto/create-external-application.dto';
import { UpdateExternalApplicationDto } from './dto/update-external-application.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

@Controller('external-application')
@ApiTags('external-application')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ExternalApplicationController {
  constructor(private readonly externalApplicationService: ExternalApplicationService) {}

  @Post()
  create(@Body() createExternalApplicationDto: CreateExternalApplicationDto) {
    return this.externalApplicationService.create(createExternalApplicationDto);
  }

  @Get()
  findAll() {
    return this.externalApplicationService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExternalApplicationDto: UpdateExternalApplicationDto
  ) {
    return this.externalApplicationService.update(+id, updateExternalApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.externalApplicationService.remove(+id);
  }
}

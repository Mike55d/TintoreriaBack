import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DistributionListsService } from './distribution-lists.service';
import { CreateDistributionListDto } from './dto/create-distribution-list.dto';
import { UpdateDistributionListDto } from './dto/update-distribution-list.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

@Controller('distribution-lists')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DistributionListsController {
  constructor(private readonly distributionListsService: DistributionListsService) {}

  @Post()
  create(@Body() createDistributionListDto: CreateDistributionListDto) {
    return this.distributionListsService.create(createDistributionListDto);
  }

  @Get('/client/:id')
  findAllByClient(@Param('id') id: string) {
    return this.distributionListsService.findAllByClient(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.distributionListsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDistributionListDto: UpdateDistributionListDto) {
    return this.distributionListsService.update(+id, updateDistributionListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.distributionListsService.remove(+id);
  }
}

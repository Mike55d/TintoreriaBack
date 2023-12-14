import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientAssetService } from './client-asset.service';
import { CreateClientAssetDto } from './dto/create-client-asset.dto';
import { UpdateClientAssetDto } from './dto/update-client-asset.dto';

@Controller('client-asset')
export class ClientAssetController {
  constructor(private readonly clientAssetService: ClientAssetService) {}

  @Post()
  async create(@Body() createClientAssetDto: CreateClientAssetDto) {
    return await this.clientAssetService.create(createClientAssetDto);
  }

  @Get()
  async findAll() {
    return await this.clientAssetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientAssetService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientAssetDto: UpdateClientAssetDto) {
    return await this.clientAssetService.update(+id, updateClientAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientAssetService.remove(+id);
  }
}

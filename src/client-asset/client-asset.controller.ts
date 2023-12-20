import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientAssetService } from './client-asset.service';
import { CreateClientAssetDto } from './dto/create-client-asset.dto';
import { UpdateClientAssetDto } from './dto/update-client-asset.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { ClientAsset } from './entities/client-asset.entity';

@Controller('client-asset')
@ApiTags('Client-assets')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ClientAssetController {
  constructor(private readonly clientAssetService: ClientAssetService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createClientAssetDto: CreateClientAssetDto) {
    return await this.clientAssetService.create(createClientAssetDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all records', type: [ClientAsset] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll() {
    return await this.clientAssetService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one records', type: ClientAsset })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findOne(@Param('id') id: string) {
    return await this.clientAssetService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: CreateClientAssetDto })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async update(@Param('id') id: string, @Body() updateClientAssetDto: UpdateClientAssetDto) {
    return await this.clientAssetService.update(+id, updateClientAssetDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id') id: string) {
    return this.clientAssetService.remove(+id);
  }
}

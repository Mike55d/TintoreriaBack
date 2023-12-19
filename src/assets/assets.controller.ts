import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { AssetTypes } from './entities/asset.entity';

@Controller('assets')
@ApiTags('Assets')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createAssetDto: CreateAssetTypeDto) {
    try {
      return await this.assetsService.create(createAssetDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all records', type: [AssetTypes] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll() {
    return await this.assetsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one records', type: AssetTypes })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findOne(@Param('id') id: string) {
    return await this.assetsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    try {
      return await this.assetsService.update(+id, updateAssetDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id') id: string) {
    return this.assetsService.remove(+id);
  }
}

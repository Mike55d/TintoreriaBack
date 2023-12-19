import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';

@Controller('assets')
@ApiTags('Assets')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async create(@Body() createAssetDto: CreateAssetTypeDto) {
    try {
      return await this.assetsService.create(createAssetDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll() {
    return await this.assetsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.assetsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    try {
      return await this.assetsService.update(+id, updateAssetDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(+id);
  }
}

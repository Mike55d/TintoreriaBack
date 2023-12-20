import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/clients.entity';

@Controller('clients')
@ApiTags('Clients')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: 'Get all records', type: [Client] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll() {
    const result = await this.clientsService.findAll();
    return result.map(it => it.json);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one record', type: Client })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findOne(@Param('id') id: string) {
    const result = await this.clientsService.findOne(+id);
    return result.json;
  }

  @Post('/')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() client: CreateClientDto) {
    const newClient = await this.clientsService.create(client);
    return newClient.json;
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async update(@Param('id') id: string, @Body() updateClientData: UpdateClientDto) {
    await this.clientsService.update(+id, updateClientData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}

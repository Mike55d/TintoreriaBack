import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
@ApiTags('Roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('/')
  async findAll() {
    const result = await this.clientsService.findAll();
    return result.map(it => it.json);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.clientsService.findOne(+id);
    return result.json;
  }

  @Post('/')
  async create(@Body() client: CreateClientDto) {
    const newClient = await this.clientsService.create(client);
    return newClient.json;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientData: UpdateClientDto) {
    await this.clientsService.update(+id, updateClientData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

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
}


import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/guards/permissions.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('tickets')
@ApiTags('Tickets')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    try {
      return await this.ticketsService.create(req.user.id, createTicketDto);
      
    } catch (error) {
      console.log(error);
    }
    return createTicketDto;
  }

  @Get()
  async findAll() {
    const tickets = await this.ticketsService.findAll();
    return tickets.map(ticket => ticket.json);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ticket = await this.ticketsService.findOne(+id);
    return ticket.json;
  }

  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    try {
      return await this.ticketsService.update(req.user.id, +id, updateTicketDto);
    } catch (error) {
      console.log(error);
    }
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }

  @Delete('comment/:id')
  @Permissions('comments:delete')
  removeComment(@Param('id') id: string) {
    return this.ticketsService.removeComment(+id);
  }

  @Get('resources/status')
  async getAllStatus() {
    return await this.ticketsService.getAllStatus();
  }

  @Get('resources/prioritys')
  async getAllPrioritys() {
    return await this.ticketsService.getAllPrioritys();
  }

  @Get('resources/types')
  async getAllTypes() {
    return await this.ticketsService.getAllTypes();
  }

  @Get('resources/impacts')
  async getAllImpacts() {
    return await this.ticketsService.getAllImpacts();
  }
  @Get('resources/urgencys')
  async getAllUrgencys() {
    return await this.ticketsService.getAllUrgencys();
  }
}

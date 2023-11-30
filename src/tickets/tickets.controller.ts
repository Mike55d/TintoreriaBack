import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
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

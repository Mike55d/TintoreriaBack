import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(createTicketDto);
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
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return await this.ticketsService.update(+id, updateTicketDto);
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

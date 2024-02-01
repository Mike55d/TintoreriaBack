import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/guards/permissions.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ticket } from './entities/ticket.entity';
import { Priority } from './entities/priority.entity';
import { Type } from './entities/type.entity';
import { Impact } from './entities/impact.entity';
import { Urgency } from './entities/urgency.entity';
import { Status } from './entities/status.entity';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AllTicketsDto } from './dto/all-tickets.dto';

@Controller('tickets')
@ApiTags('Tickets')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(req.user.id, createTicketDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all records', type: [Ticket] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll(@Query(ValidationPipe) q: AllTicketsDto) {
    try {
      const tickets = await this.ticketsService.findAll(q);
      return tickets;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one records', type: Ticket })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findOne(@Param('id') id: string) {
    const ticket = await this.ticketsService.findOne(+id);
    return ticket.json;
  }

  @Patch(':id')
  @ApiBody({ type: CreateTicketDto })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async update(@Request() req, @Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return await this.ticketsService.update(req.user.id, +id, updateTicketDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }

  @Delete('comment/:id')
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Permissions('comments:delete')
  removeComment(@Param('id') id: string) {
    return this.ticketsService.removeComment(+id);
  }

  @Get('resources/status')
  @ApiResponse({ status: 200, description: 'Get all records', type: [Status] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getAllStatus() {
    return await this.ticketsService.getAllStatus();
  }

  @Get('resources/prioritys')
  @ApiResponse({ status: 200, description: 'Get all records', type: [Priority] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getAllPrioritys() {
    return await this.ticketsService.getAllPrioritys();
  }

  @Get('resources/types')
  @ApiResponse({ status: 200, description: 'Get all records', type: [Type] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getAllTypes() {
    return await this.ticketsService.getAllTypes();
  }

  @Get('resources/impacts')
  @ApiResponse({ status: 200, description: 'Get all records', type: [Impact] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getAllImpacts() {
    return await this.ticketsService.getAllImpacts();
  }
  @Get('resources/urgencys')
  @ApiResponse({ status: 200, description: 'Get all records', type: [Urgency] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getAllUrgencys() {
    return await this.ticketsService.getAllUrgencys();
  }
}

import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';
import { Priority } from './entities/priority.entity';
import { Type } from './entities/type.entity';
import { Impact } from './entities/impact.entity';
import { Urgency } from './entities/urgency.entity';
import { Ticket } from './entities/ticket.entity';

const allRelations = [
  'requesting_users',
  'observer_users',
  'assigned_users',
  'priority',
  'type',
  'impact',
  'urgency',
  'status'
];

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Priority)
    private priorityRepository: Repository<Priority>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
    @InjectRepository(Impact)
    private impactRepository: Repository<Impact>,
    @InjectRepository(Urgency)
    private urgencyRepository: Repository<Urgency>
  ) {}

  create(createTicketDto: CreateTicketDto) {
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      requesting_users: createTicketDto.requesting_users.map(val => ({ id: val })),
      observer_users: createTicketDto.observer_users.map(val => ({ id: val })),
      assigned_users: createTicketDto.assigned_users.map(val => ({ id: val })),
      priority: {
        id: createTicketDto.priority
      },
      type: {
        id: createTicketDto.type
      },
      impact: {
        id: createTicketDto.impact
      },
      status: {
        id: createTicketDto.status
      },
      urgency: {
        id: createTicketDto.urgency
      }
    });
    return this.ticketRepository.save(ticket);
  }

  findAll() {
    return this.ticketRepository.find({
      relations: allRelations
    });
  }

  findOne(id: number) {
    return this.ticketRepository.findOne({
      where: {
        id
      },
      relations: allRelations,

    });
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.ticketRepository.save({
      ...updateTicketDto,
      id,
      requesting_users: updateTicketDto.requesting_users.map(val => ({ id: val })),
      observer_users: updateTicketDto.observer_users.map(val => ({ id: val })),
      assigned_users: updateTicketDto.assigned_users.map(val => ({ id: val })),
      priority: {
        id: updateTicketDto.priority
      },
      type: {
        id: updateTicketDto.type
      },
      impact: {
        id: updateTicketDto.impact
      },
      status: {
        id: updateTicketDto.status
      },
      urgency: {
        id: updateTicketDto.urgency
      }
    });
  }

  async remove(id: number) {
    const ticket = await this.findOne(id);
    if (ticket) {
      await this.ticketRepository.remove(ticket);
    }
  }

  getAllStatus() {
    return this.statusRepository.find({});
  }

  getAllPrioritys() {
    return this.priorityRepository.find({});
  }

  getAllTypes() {
    return this.typeRepository.find({});
  }

  getAllImpacts() {
    return this.impactRepository.find({});
  }

  getAllUrgencys() {
    return this.urgencyRepository.find({});
  }
}

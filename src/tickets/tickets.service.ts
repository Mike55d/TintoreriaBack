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
import { User } from '../users/entities/user.entity';

const allRelations = [
  'requesting_users',
  'observer_users',
  'assigned_users',
  'priority',
  'type',
  'impact',
  'urgency',
  'status',
  'assigned_users.user'
];

type UsersRequest = { user?: number; email?: string };

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
    private urgencyRepository: Repository<Urgency>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async parseUsersToPersist(users: UsersRequest[]) {
    console.log(users);
    const usersFormat = [];
    for (let user of users) {
      const userExist = await this.userRepository.findOneBy({ id: user.user });
      usersFormat.push({
        user: userExist ? userExist.id : null,
        email: user.email
      });
    }
    return usersFormat;
  }

  async create(createTicketDto: CreateTicketDto) {
    try {
      console.log(createTicketDto);
      const requesting_users = await this.parseUsersToPersist(createTicketDto.requesting_users);
      const observer_users = await this.parseUsersToPersist(createTicketDto.observer_users);
      const assigned_users = await this.parseUsersToPersist(createTicketDto.assigned_users);
      const ticket = this.ticketRepository.create({
        ...createTicketDto,
        requesting_users,
        observer_users,
        assigned_users,
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
      return;
    } catch (error) {
      console.log(error);
    }
    return;
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
      relations: allRelations
    });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const requesting_users = await this.parseUsersToPersist(updateTicketDto.requesting_users);
    const observer_users = await this.parseUsersToPersist(updateTicketDto.observer_users);
    const assigned_users = await this.parseUsersToPersist(updateTicketDto.assigned_users);

    return this.ticketRepository.save({
      ...updateTicketDto,
      id,
      requesting_users,
      observer_users,
      assigned_users,
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

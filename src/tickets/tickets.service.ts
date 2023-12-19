import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { LessThan, Repository } from 'typeorm';
import { Priority } from './entities/priority.entity';
import { Type } from './entities/type.entity';
import { Impact } from './entities/impact.entity';
import { Urgency } from './entities/urgency.entity';
import { Ticket } from './entities/ticket.entity';
import { User } from '../users/entities/user.entity';
import { CommentTicket } from './entities/comment-ticket.entity';
import { Cron } from '@nestjs/schedule';
import { SlAlert } from './entities/sl-alert.entity';

const allRelations = [
  'requesting_users',
  'observer_users',
  'assigned_users',
  'priority',
  'type',
  'impact',
  'urgency',
  'status',
  'assigned_users.user',
  'comments'
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
    private userRepository: Repository<User>,
    @InjectRepository(CommentTicket)
    private commentRepository: Repository<CommentTicket>,
    @InjectRepository(SlAlert)
    private slAlertRepository: Repository<SlAlert>
  ) {}

  async parseUsersToPersist(users: UsersRequest[]) {
    const usersFormat = [];
    if (users?.length) {
      for (let user of users) {
        const userExist = await this.userRepository.findOneBy({ id: user.user });
        usersFormat.push({
          user: userExist ? userExist.id : null,
          email: user.email
        });
      }
    }
    return usersFormat;
  }

  async create(userId: number, createTicketDto: CreateTicketDto) {
    const requesting_users = await this.parseUsersToPersist(createTicketDto.requesting_users);
    const observer_users = await this.parseUsersToPersist(createTicketDto.observer_users);
    const assigned_users = await this.parseUsersToPersist(createTicketDto.assigned_users);
    const comments = createTicketDto.comments.map(comment => ({
      comment: comment.comment,
      user: { id: userId }
    }));
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
      },
      comments: comments,
      client: {
        id: createTicketDto.client
      },
      asset: {
        id: createTicketDto.asset
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
      relations: allRelations
    });
  }

  async update(userId, id: number, updateTicketDto: UpdateTicketDto) {
    const requesting_users = await this.parseUsersToPersist(updateTicketDto.requesting_users);
    const observer_users = await this.parseUsersToPersist(updateTicketDto.observer_users);
    const assigned_users = await this.parseUsersToPersist(updateTicketDto.assigned_users);
    const comments = updateTicketDto.comments.map(comment => ({
      comment: comment.comment,
      user: { id: userId }
    }));
    const ticket = await this.ticketRepository.findOne({ where: { id }, relations: allRelations });

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
      },
      comments: [...ticket.comments, ...comments],
      client: {
        id: updateTicketDto.client
      },
      asset: {
        id: updateTicketDto.asset
      }
    });
  }

  async remove(id: number) {
    const ticket = await this.findOne(id);
    if (ticket) {
      await this.ticketRepository.remove(ticket);
    }
  }

  async removeComment(id: number) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (comment) {
      await this.commentRepository.remove(comment);
    }
  }

  @Cron('45 * * * * *')
  async expiredLicenses() {
    const tickets = await this.ticketRepository.find({
      relations: ['type', 'priority'],
      where: {
        status: { id: 1 }
      }
    });
    const ticketsExpired = tickets.filter(ticket => {
      const deadline = ticket.openingDate;
      if (ticket.type.id == 1) {
        switch (ticket.priority.id) {
          case 1:
            deadline.setMinutes(ticket.openingDate.getMinutes() + 120);
            return this.compareDates(deadline);
          case 2:
            deadline.setMinutes(ticket.openingDate.getMinutes() + 40);
            return this.compareDates(deadline);
          case 3:
            deadline.setMinutes(ticket.openingDate.getMinutes() + 20);
            return this.compareDates(deadline);
          case 4:
            return true;
          default:
            break;
        }
      } else {
        switch (ticket.priority.id) {
          case 1:
            deadline.setHours(ticket.openingDate.getHours() + 8);
            return this.compareDates(deadline);
          case 2:
            deadline.setHours(ticket.openingDate.getHours() + 4);
            return this.compareDates(deadline);
          case 3:
            deadline.setMinutes(ticket.openingDate.getMinutes() + 30);
            return this.compareDates(deadline);
          case 4:
            return true;
          default:
            break;
        }
      }
    });
    try {
      for (let ticket of ticketsExpired) {
        const lastAlert = await this.slAlertRepository.findOne({
          where: { ticket: { id: ticket.id } },
          order: { id: 'DESC' }
        });
        const deadlineAlert = lastAlert?.regDate;
        if (deadlineAlert) {
          deadlineAlert.setMinutes(lastAlert.regDate.getMinutes() + 10);
        }
        if (lastAlert && new Date() < deadlineAlert) return;
        const usersAdmin = await this.userRepository.find({
          where: { roles: { role: { id: 1 } } }
        });
        for (let user of usersAdmin) {
          const alert = this.slAlertRepository.create({
            ticket,
            user
          });
          this.slAlertRepository.save(alert);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  compareDates(deadline: Date) {
    if (new Date() > deadline) {
      return true;
    }
    return false;
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

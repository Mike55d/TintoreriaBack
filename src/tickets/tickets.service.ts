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
import { AllTicketsDto } from './dto/all-tickets.dto';
import { Historic } from '../historic/entities/historic.entity';
import path from 'path';
import fs from 'fs/promises';
import { homedir } from 'os';
import { v4 as uuid } from 'uuid';
import { FileE } from './entities/files.entity';
import sanitizeHtml from 'sanitize-html';
import { SANITIZE_CONFIG } from '../email/constants';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { historyTypes } from '../historic/historic.types';
import { Errors } from '../errors/errors.types';
import { CustomError } from '../errors/custom-error';
import { EmailService } from '../email/email.service';
import moment from 'moment';
import { AtentionTime } from '../atention-time/entities/atention-time.entity';

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
  'requesting_users.user',
  'observer_users.user',
  'comments',
  'comments.user',
  'client',
  'asset',
  'category',
  'alertTitle'
];

type UsersRequest = { id?: number; user?: number; email?: string };

@Injectable()
export class TicketsService {
  constructor(
    private readonly emailService: EmailService,
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
    @InjectRepository(Historic)
    private historicRepository: Repository<Historic>,
    @InjectRepository(FileE)
    private fileERepository: Repository<FileE>,
    @InjectRepository(AtentionTime)
    private atentionTimeERepository: Repository<AtentionTime>
  ) {}

  async parseUsersToPersist(users: UsersRequest[]) {
    const usersFormat = [];
    if (users?.length) {
      for (let user of users) {
        const userExist = await this.userRepository.findOneBy({ email: user.email });
        usersFormat.push({
          user: userExist ? userExist.id : null,
          email: user.email
        });
      }
    }
    return usersFormat;
  }

  async create(user: User, createTicketDto: CreateTicketDto) {
    const userId = user.id;
    const requesting_users = await this.parseUsersToPersist(createTicketDto.requesting_users);
    const observer_users = await this.parseUsersToPersist(createTicketDto.observer_users);
    const assigned_users = await this.parseUsersToPersist(createTicketDto.assigned_users);
    const comments = createTicketDto.comments?.map(comment => ({
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
      asset: createTicketDto.asset
        ? {
            id: createTicketDto.asset
          }
        : null,
      category: createTicketDto.category
        ? {
            id: createTicketDto.category
          }
        : null,
      alertTitle: createTicketDto.alertTitle
        ? {
            id: createTicketDto.alertTitle
          }
        : null,
      eventDescription: sanitizeHtml(createTicketDto.eventDescription, SANITIZE_CONFIG)
    });
    const savedTicket = await this.ticketRepository.save(ticket);
    const ticketNew = await this.ticketRepository.findOne({
      where: { id: savedTicket.id },
      relations: allRelations
    });
    const historicRecord = this.historicRepository.create({
      title: 'Creado',
      content: JSON.stringify(ticketNew.json),
      user: { id: userId },
      ticket: { id: savedTicket.id }
    });
    await this.historicRepository.save(historicRecord);

    if (user.id != -1) {
      this.emailService.notify(ticketNew, null, user, true);
    }

    return savedTicket;
  }

  async findAll(q: AllTicketsDto) {
    try {
      const formatFilters = q.filters?.map(filter => filter.split(','));
      const query = this.ticketRepository
        .createQueryBuilder('tickets')
        .leftJoinAndSelect('tickets.priority', 'priority')
        .leftJoinAndSelect('tickets.type', 'type')
        .leftJoinAndSelect('tickets.impact', 'impact')
        .leftJoinAndSelect('tickets.urgency', 'urgency')
        .leftJoinAndSelect('tickets.status', 'status')
        .leftJoinAndSelect('tickets.client', 'client')
        .leftJoinAndSelect('tickets.asset', 'asset')
        .leftJoinAndSelect('tickets.requesting_users', 'requesting_users')
        .leftJoinAndSelect('tickets.observer_users', 'observer_users')
        .leftJoinAndSelect('tickets.assigned_users', 'assigned_users')
        .leftJoinAndSelect('tickets.comments', 'comments')
        .leftJoinAndSelect('comments.user', 'user');
      if (q.skip || q.take) {
        query.skip(q.skip).take(q.take);
      }
      if (q.orderBy && q.orderDir) {
        const order = q.orderDir.toUpperCase() as 'ASC' | 'DESC';
        query.orderBy(`tickets.${q.orderBy}`, order);
      }
      formatFilters?.forEach((filter, key) => {
        const field = filter[1] == 'LIKE' ? `'%${filter[2]}%'` : `'${filter[2]}'`;
        if (!key) {
          query.where(`tickets.${filter[0]} ${filter[1]} ${field}`);
        } else {
          query[filter[3].toLowerCase() + 'Where'](`tickets.${filter[0]} ${filter[1]} ${field}`);
        }
      });
      if (q.sla) {
        if (q.skip == 0) {
          await this.expiredTickets();
        }
        query
          .andWhere('tickets.hoursExpired > 0')
          .orderBy('tickets.priority', 'DESC')
          .addOrderBy('tickets.hoursExpired', 'DESC');
      }
      const data = await query.getMany();
      const rows = await query.getCount();
      return { data: data.map(x => x.json), rows };
    } catch (error) {
      console.log(error);
    }
  }

  async expiredTickets() {
    const tickets = await this.ticketRepository.find({
      relations: ['type', 'priority'],
      where: {
        status: { id: 1 }
      },
      order: { id: 'DESC' },
      take: 10
    });
    const atentionTime = await this.atentionTimeERepository.find({
      relations: ['type', 'priority']
    });
    if (!atentionTime.length) return;
    for (let ticket of tickets) {
      {
        const deadline = ticket.openingDate;
        let isExpired = false;
        const atTime = atentionTime.find(at => at.type.id == ticket.type.id && at.priority.id == 1);
        const timeType = atTime.typeTime == 0 ? 'Minutes' : 'Hours';
        deadline[`set${timeType}`](ticket.openingDate[`get${timeType}`]() + atTime.time);
        isExpired = this.compareDates(deadline);
        if (isExpired) {
          try {
            var now = moment(new Date()); //todays date
            var end = moment(deadline); // another date
            var duration = moment.duration(now.diff(end));
            var hours = duration.asHours();
            await this.ticketRepository.update(ticket.id, {
              hoursExpired: Math.trunc(hours)
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  }

  findOne(id: number) {
    return this.ticketRepository.findOne({
      where: {
        id
      },
      order: {
        comments: {
          id: 'ASC'
        }
      },
      relations: allRelations
    });
  }

  findByConversationId(conversationId: string) {
    return this.ticketRepository.findOne({
      where: {
        conversationId
      },
      order: {
        comments: {
          id: 'ASC'
        }
      },
      relations: allRelations
    });
  }

  async update(userId, id: number, updateTicketDto: UpdateTicketDto) {
    const requesting_users = await this.parseUsersToPersist(updateTicketDto.requesting_users);
    const observer_users = await this.parseUsersToPersist(updateTicketDto.observer_users);
    const assigned_users = await this.parseUsersToPersist(updateTicketDto.assigned_users);
    const comments = updateTicketDto.comments?.map(comment => ({
      comment: comment.comment,
      user: { id: userId }
    }));
    const ticket = await this.ticketRepository.findOne({ where: { id }, relations: allRelations });
    const newTicket = {
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
      comments: comments ? [...ticket.comments, ...comments] : [...ticket.comments],
      client: {
        id: updateTicketDto.client
      },
      asset: updateTicketDto.asset
        ? {
            id: updateTicketDto.asset
          }
        : null,
      category: updateTicketDto.category
        ? {
            id: updateTicketDto.category
          }
        : null,
      alertTitle: updateTicketDto.alertTitle
        ? {
            id: updateTicketDto.alertTitle
          }
        : null,
      eventDescription: sanitizeHtml(updateTicketDto.eventDescription, SANITIZE_CONFIG)
    };
    await this.ticketRepository.save(newTicket);
    const ticketNew = await this.ticketRepository.findOne({
      where: { id },
      relations: allRelations
    });
    const historicRecord = this.historicRepository.create({
      title: 'Actualizado',
      content: JSON.stringify(ticketNew.json),
      user: { id: userId },
      ticket: { id }
    });
    this.historicRepository.save(historicRecord);
    return ticketNew;
  }

  async remove(id: number) {
    const ticket = await this.findOne(id);
    if (ticket) {
      await this.ticketRepository.remove(ticket);
    }
  }

  async removeComment(id: number, user: User) {
    try {
      const comment = await this.commentRepository.findOne({ where: { id }, relations: ['user'] });
      if (
        user?.roles[0].role.name == 'admin' ||
        user?.roles[0].role.name == 'supervisor' ||
        (user?.roles[0].role.name == 'tecnician' && user.id == comment.user.id)
      ) {
        if (comment) {
          await this.commentRepository.remove(comment);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    try {
      if (files[0]) {
        const file = files[0];
        const ext = path.extname(file.originalname);
        const filename = file.originalname;
        await fs.writeFile(
          path.join(homedir(), process.env.FILES_PATH, filename),
          file.buffer,
          'binary'
        );
        const fileE = this.fileERepository.create({
          filename
        });
        return await this.fileERepository.save(fileE);
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

  async replyTicket(createHistoryDto: CreateHistoricDto) {
    if (createHistoryDto.user && createHistoryDto.email) {
      throw new CustomError(Errors.INVALID_RESOURCES, {
        details: {
          message: 'Cant create with user and email'
        }
      });
    }
    let type;
    if (createHistoryDto.user) {
      type = historyTypes.ANALIST;
    } else {
      type = historyTypes.USER;
    }

    try {
      const history = this.historicRepository.create({
        content: sanitizeHtml(createHistoryDto.content, SANITIZE_CONFIG),
        ticket: { id: createHistoryDto.ticket },
        title: createHistoryDto.title,
        type
      });
      return await this.historicRepository.save(history);
    } catch (error) {
      throw new CustomError(Errors.INTERNAL_ERROR);
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Historic } from './entities/historic.entity';
import { Repository } from 'typeorm';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { historyTypes } from './historic.types';
import sanitizeHtml from 'sanitize-html';
import { SANITIZE_CONFIG } from '../email/constants';
import { EmailService } from '../email/email.service';
import { TicketsService } from '../tickets/tickets.service';
import { CustomError } from '../errors/custom-error';
import { Errors } from '../errors/errors.types';
import { UsersService } from '../users/users.service';

@Injectable()
export class HistoricService {
  constructor(
    @InjectRepository(Historic)
    private historicRepository: Repository<Historic>,
    private readonly emailService: EmailService,
    private readonly ticketService: TicketsService,
    private readonly usersService: UsersService
  ) {}

  findAll() {
    return this.historicRepository.find({ relations: ['user', 'ticket'] });
  }

  findAllByTicket(ticketId: number) {
    return this.historicRepository.find({
      relations: ['user', 'ticket'],
      where: { ticket: { id: ticketId } },
      order: { id: 'DESC' }
    });
  }

  async replyTicket(idUser: number, id: number, createHistoryDto: CreateHistoricDto) {
    try {
      const ticket = await this.ticketService.findOne(id);
      const user = await this.usersService.findOne(idUser);

      if (!ticket || !user) {
        throw new CustomError(Errors.RESOURCE_NOT_FOUND);
      }

      const content = sanitizeHtml(createHistoryDto.message, SANITIZE_CONFIG);

      const history = this.historicRepository.create({
        content,
        includeIcs: createHistoryDto.includeIcs,
        user: { id: idUser },
        ticket: { id },
        title: 'Respuesta',
        type: historyTypes.ANALIST
      });
      const reply = await this.historicRepository.save(history);
      await this.emailService.notify(ticket, content, user, createHistoryDto.includeIcs);
      
      return reply;
    } catch (error) {
      console.log(error);
    }
  }
}

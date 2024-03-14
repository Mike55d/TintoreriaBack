import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Historic } from './entities/historic.entity';
import { Repository } from 'typeorm';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { historyTypes } from './historic.types';
import sanitizeHtml from 'sanitize-html';
import { SANITIZE_CONFIG } from '../email/constants';

@Injectable()
export class HistoricService {
  constructor(
    @InjectRepository(Historic)
    private historicRepository: Repository<Historic>
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

  replyTicket(idUser: number, id: number, createHistoryDto: CreateHistoricDto) {
    try {
      const history = this.historicRepository.create({
        content: sanitizeHtml(createHistoryDto.message, SANITIZE_CONFIG),
        includeIcs: createHistoryDto.includeIcs,
        user: { id: idUser },
        ticket: { id },
        title: 'Respuesta',
        type: historyTypes.ANALIST
      });
      return this.historicRepository.save(history);
    } catch (error) {
      console.log(error);
    }
  }
}

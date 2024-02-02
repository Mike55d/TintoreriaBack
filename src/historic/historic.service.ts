import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Historic } from './entities/historic.entity';
import { Repository } from 'typeorm';

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
}

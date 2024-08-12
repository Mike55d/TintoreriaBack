import { Injectable } from '@nestjs/common';
import { AtentionTimeDto, CreateAtentionTimeDto } from './dto/create-atention-time.dto';
import { UpdateAtentionTimeDto } from './dto/update-atention-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtentionTime } from './entities/atention-time.entity';

@Injectable()
export class AtentionTimeService {
  constructor(
    @InjectRepository(AtentionTime)
    private atentionTimeRepository: Repository<AtentionTime>
  ) {}

  async create(createAtentionTimeDto: AtentionTimeDto) {
    try {
      const atentionTimes = await this.atentionTimeRepository.findBy({});
      if (atentionTimes.length) {
        for (let atentionTime of atentionTimes) {
          const newValues = createAtentionTimeDto.values.find(at => at.id == atentionTime.id);
          await this.atentionTimeRepository.update(atentionTime.id, {
            priority: { id: newValues.priority },
            time: newValues.time,
            type: { id: newValues.type },
            typeTime: newValues.typeTime
          });
        }
      } else {
        for (let atentionTime of createAtentionTimeDto.values) {
          const newAtentionTime = this.atentionTimeRepository.create({
            priority: { id: atentionTime.priority },
            time: atentionTime.time,
            type: { id: atentionTime.type },
            typeTime: atentionTime.typeTime
          });
          await this.atentionTimeRepository.save(newAtentionTime);
        }
      }
      return 'This action adds a new atentionTime';
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll() {
    try {
      const atentionTimes = await this.atentionTimeRepository.find({
        relations: ['type', 'priority']
      });
      return atentionTimes.map(at => at.json);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} atentionTime`;
  }

  update(id: number, updateAtentionTimeDto: UpdateAtentionTimeDto) {
    return `This action updates a #${id} atentionTime`;
  }

  remove(id: number) {
    return `This action removes a #${id} atentionTime`;
  }
}

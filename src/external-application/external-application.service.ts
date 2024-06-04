import { Injectable } from '@nestjs/common';
import { CreateExternalApplicationDto } from './dto/create-external-application.dto';
import { UpdateExternalApplicationDto } from './dto/update-external-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalApplication } from './entities/external-application.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ExternalApplicationService {
  constructor(
    @InjectRepository(ExternalApplication)
    private readonly externalApplicationRepository: Repository<ExternalApplication>
  ) {}

  async create(createExternalApplicationDto: CreateExternalApplicationDto) {
    const app = this.externalApplicationRepository.create({
      ...createExternalApplicationDto,
      clientId: uuid(),
      clientSecret: uuid() + uuid()
    });
    await this.externalApplicationRepository.save(app);
  }

  async findAll() {
    const apps = await this.externalApplicationRepository.findBy({});
    return apps;
  }

  async update(id: number, updateExternalApplicationDto: UpdateExternalApplicationDto) {
    const app = await this.externalApplicationRepository.findOneBy({ id });
    const newApp = this.externalApplicationRepository.merge(app, updateExternalApplicationDto);
    await this.externalApplicationRepository.save(newApp);
    return `This action updates a #${id} externalApplication`;
  }

  async remove(id: number) {
    const app = await this.externalApplicationRepository.findOneBy({ id });
    await this.externalApplicationRepository.remove(app);
    return `This action removes a #${id} externalApplication`;
  }
}

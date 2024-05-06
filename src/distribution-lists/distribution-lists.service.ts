import { Injectable } from '@nestjs/common';
import { CreateDistributionListDto } from './dto/create-distribution-list.dto';
import { UpdateDistributionListDto } from './dto/update-distribution-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DistributionList } from './entities/distributionList.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistributionListsService {
  constructor(
    @InjectRepository(DistributionList)
    private distributionListRepository: Repository<DistributionList>
  ) {}

  create(createDistributionListDto: CreateDistributionListDto) {
    const newDistributionList = this.distributionListRepository.create({
      name: createDistributionListDto.name,
      alertTitle: {
        id: parseInt(createDistributionListDto.alertTitle)
      },
      client: {
        id: createDistributionListDto.client
      },
      emails: createDistributionListDto.emails.join(',')
    });
    return this.distributionListRepository.save(newDistributionList);
  }

  async findAllByClient(client: number) {
    const data = await this.distributionListRepository.find({
      where: { client: { id: client } },
      relations: ['alertTitle']
    });
    return data.map(x => x.json);
  }

  findOne(id: number) {
    return `This action returns a #${id} distributionList`;
  }

  update(id: number, updateDistributionListDto: UpdateDistributionListDto) {
    return this.distributionListRepository.save({
      id,
      name: updateDistributionListDto.name,
      alertTitle: { id: parseInt(updateDistributionListDto.alertTitle) },
      emails: updateDistributionListDto.emails.join(',')
    });
  }

  async remove(id: number) {
    const distributionList = await this.distributionListRepository.findBy({ id });
    return await this.distributionListRepository.remove(distributionList);
  }
}

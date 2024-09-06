import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { GetCompaniesDto } from './dto/get-companies.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const company = this.companiesRepository.create(createCompanyDto);
      return await this.companiesRepository.save(company);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll(query: GetCompaniesDto) {
    const data = await this.companiesRepository.find({
      skip: query.skip,
      take: query.take,
      order: { id: 'DESC' }
    });
    const count = await this.companiesRepository.count();
    return { data, count };
  }

  async findOne(id: number) {
    return await this.companiesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companiesRepository.update(id, updateCompanyDto);
  }

  async remove(id: number) {
    const company = await this.findOne(id);

    if (company) {
      await this.companiesRepository.remove(company);
    }
  }
}

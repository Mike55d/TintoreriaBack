import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { AlertTitle } from './entities/alert-title.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(AlertTitle)
    private alertTitleRepository: Repository<AlertTitle>
  ) {}

  create(createAssetDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createAssetDto);
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find({ relations: ['alertTitles'] });
  }

  findOne(id: number) {
    return this.categoryRepository.find({ where: { id }, relations: ['alertTitles'] });
  }

  update(id: number, updateAssetDto: UpdateCategoryDto) {
    return this.categoryRepository.save({
      id,
      ...updateAssetDto
    });
  }

  async remove(id: number) {
    const asset = await this.categoryRepository.findBy({ id });
    return await this.categoryRepository.remove(asset);
  }

  async findAllAlertTitles() {
    try {
      return await this.alertTitleRepository.find({});
    } catch (error) {
      console.log(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  create(createRoleDto: CreateRoleDto ): Promise<Role> {
    const role = this.rolesRepository.create({
      ...createRoleDto,
      readOnly: false,
    });
    return this.rolesRepository.save(role);
  }

  async findAll() {
    return this.rolesRepository.findBy({
    });
  }

  // async findAllByOrg(id: number) {
  //   return this.rolesRepository.findBy({
  //   });
  // }

  findOne(id: number) {
    return this.rolesRepository.findOneByOrFail({ id });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.rolesRepository.update(id, {
      ...updateRoleDto,
      readOnly: true
    });
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    this.rolesRepository.remove(role);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Organization } from '../organizations/entities/organization.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  create(createRoleDto: CreateRoleDto, org: Organization): Promise<Role> {
    const role = this.rolesRepository.create({
      ...createRoleDto,
      readOnly: false,
      org: { id: org.id }
    });
    return this.rolesRepository.save(role);
  }

  async findAll(org: Organization) {
    return this.rolesRepository.findBy({
      org: { id: org.id }
    });
  }

  async findAllByOrg(id: number) {
    return this.rolesRepository.findBy({
      org: { id }
    });
  }

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

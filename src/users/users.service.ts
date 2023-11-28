import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiConfigService } from '../api-config/api-config.service';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { Organization } from '../organizations/entities/organization.entity';
import { CustomError } from '../errors/custom-error';
import { Errors } from '../errors/errors.types';
import { Role } from '../roles/entities/role.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import fs from 'fs';
import path from 'path';
import { newPasswordDataDto } from './dto/new-password-data.dto';
import { UsersToRoles } from './entities/usersToRoles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private apiConfigService: ApiConfigService
  ) {}

  async create(registrar: User, createUserDto: CreateUserDto) {
    const result = this.usersRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      roles: createUserDto.roles.map(id => ({ role: { id } as Role } as UsersToRoles)),
      org: createUserDto.orgId ? { id: createUserDto.orgId } : registrar.org,
      registrar: { id: registrar.id },
      profile: {
        darkMode: false,
        skipUntrustedRedirect: false,
        trustedDomains: []
      },
      salt: createUserDto.salt,
      verifier: createUserDto.verifier
    });
    const entity = await this.usersRepository.save(result);
    return this.findOne(entity.id);
  }

  findAll(org: Organization) {
    return this.usersRepository.find({
      where: {
        org: {
          id: org.id
        },
        support:false,
        deleted:false,    
      },
      relations: ['org']
    });
  }

  findAllUsers() {
    return this.usersRepository.find({
      relations: {
        roles: {
          role: true
        }
      }
    });
  }

  findAllByOrg(org: number) {
    return this.usersRepository.find({
      where: {
        org: {
          id: org
        },
        deleted: false
      },
      relations: ['org']
    });
  }

  findOne(id: number) {
    try {
      return this.usersRepository.findOneOrFail({
        where: { id, deleted: false },
        relations: ['org', 'roles', 'roles.role']
      });
    } catch (error) {
      console.log(error);
    }
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneOrFail({
      where: { email, deleted: false },
      relations: ['org']
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { roles, ...params } = updateUserDto;
    let user = await this.findOne(id);
    user = this.usersRepository.merge(user, params);
    if (roles?.length) {
      user.roles = roles.map(id => ({ role: { id } as Role } as UsersToRoles));
    }
    await this.usersRepository.save(user);
  }

  async updateProfile(id: number, profile: UpdateUserProfileDto) {
    let user = await this.findOne(id);
    user = this.usersRepository.merge(user, {
      profile
    });
    await this.usersRepository.save(user);
  }

  async changePassword(id: number, newPasswordData: newPasswordDataDto) {
    const user = await this.usersRepository.findOneBy({ id });
    user.salt = newPasswordData.salt;
    user.verifier = newPasswordData.verifier;
    await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    user.deleted = true;
    await this.usersRepository.save(user);
  }

  async getUsersByRoles(org: Organization, roles: Role[]) {
    const users = await this.usersRepository.find({
      where: { deleted: false, org: { id: org.id } },
      relations: ['sessions', 'sessions.user', 'org', 'registrar']
    });

    const rolesIds = roles.map(it => it.id);
    return users.filter(it => {
      for (const role of it.roles) {
        if (rolesIds.includes(role.role.id)) {
          return true;
        }
      }
      return false;
    });
  }
}

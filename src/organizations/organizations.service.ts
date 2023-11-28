import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { v4 as uuid } from 'uuid';
import path from 'path';
import fs from 'fs/promises';
import { homedir } from 'os';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { CustomError } from '../errors/custom-error';
import { Errors } from '../errors/errors.types';
import { OperationLevel } from './organizations.types';
import { Role } from '../roles/entities/role.entity';
import { defaultRolesOrg } from './constants';
import { Permission } from '../roles/roles.types';
import { User } from '../users/entities/user.entity';
import { PreSession } from '../sessions/entities/pre-session.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(PreSession)
    private preSessionRepository: Repository<PreSession>,
  ) {}

  async findAll(): Promise<Organization[]> {
    const organizations = await this.organizationsRepository
      .createQueryBuilder('org')
      .leftJoinAndSelect('org.users', 'user', 'user.deleted = :deleted', { deleted: false })
      .getMany();
    return organizations;
  }

  async findOne(id: number): Promise<Organization> {
    return await this.organizationsRepository.findOneOrFail({
      where: { id },
      relations: ['credentials']
    });
  }

  async updateToolbar(updateToolbar, files: Array<Express.Multer.File>) {
    try {
      const org = await this.organizationsRepository.findOne({
        where: { id: updateToolbar.orgId }
      });
      if (updateToolbar.color) {
        org.colorTopbar = updateToolbar.color;
      }
      if (files[0]) {
        const file = files[0];
        const ext = path.extname(file.originalname);
        const filename = `${uuid()}${ext}`;
        await fs.writeFile(
          path.join(homedir(), process.env.LOGOS_PATH, filename),
          file.buffer,
          'binary'
        );
        org.logo = filename;
      }
      await this.organizationsRepository.save(org);
    } catch (error) {
      console.log(error);
    }
    return 'toolbar updated';
  }

  async getLogo(id: string) {
    try {
      const org = await this.organizationsRepository.findOneBy({ id: parseInt(id) });
      return org.logo;
    } catch (error) {
      console.log(error);
    }
  }

  async update(updateOrganization: UpdateOrganizationDto, files: Array<Express.Multer.File>) {
    try {
      const org = await this.findOne(updateOrganization.id);
      if (updateOrganization.colorTopbar) {
        org.colorTopbar = updateOrganization.colorTopbar;
      }
      if (files[0]) {
        const file = files[0];
        const ext = path.extname(file.originalname);
        const filename = `${uuid()}${ext}`;
        await fs.writeFile(
          path.join(homedir(), process.env.LOGOS_PATH, filename),
          file.buffer,
          'binary'
        );
        org.logo = filename;
      }
      org.domain = updateOrganization.domain;
      org.name = updateOrganization.name;
      org.operationLevel = updateOrganization.operationLevel;
      await this.organizationsRepository.save(org);
    } catch (error) {
      console.log(error);
    }
  }

  async create(updateOrganization: UpdateOrganizationDto, files: Array<Express.Multer.File>) {
    try {
      const org = await this.organizationsRepository.create({
        domain: updateOrganization.domain,
        name: updateOrganization.name,
        operationLevel: updateOrganization.operationLevel,
        colorTopbar: updateOrganization.colorTopbar ? updateOrganization.colorTopbar : null
      });

      if (files[0]) {
        const file = files[0];
        const ext = path.extname(file.originalname);
        const filename = `${uuid()}${ext}`;
        await fs.writeFile(
          path.join(homedir(), process.env.LOGOS_PATH, filename),
          file.buffer,
          'binary'
        );
        org.logo = filename;
      }
      const orgSaved = await this.organizationsRepository.save(org);
      // create default roles
      for (let defaultRole of defaultRolesOrg) {
        const newRole = this.rolesRepository.create({
          name: defaultRole.name,
          permissions: defaultRole.permissions.split(',') as Permission[],
          readOnly: defaultRole.readonly,
          org: { id: orgSaved.id }
        });
        await this.rolesRepository.save(newRole);
      }
      //create admin default
      const roleAdminOrg = await this.rolesRepository.findOneBy({
        org: { id: orgSaved.id }
      });
      const newUser = this.usersRepository.create({
        name: updateOrganization.username,
        email: updateOrganization.email,
        salt: updateOrganization.salt,
        verifier: updateOrganization.verifier,
        profile: {
          darkMode: false,
          skipUntrustedRedirect: false,
          trustedDomains: []
        },
        org: orgSaved,
        roles: [
          {
            role: roleAdminOrg
          }
        ]
      });
      await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOrg(id: number) {
    try {
      const org = await this.organizationsRepository.findOneBy({ id: id });
      await this.organizationsRepository.remove(org);
    } catch (error) {
      console.log(error);
      throw new CustomError(Errors.INTERNAL_ERROR);
    }
  }
}

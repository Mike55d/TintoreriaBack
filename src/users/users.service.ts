import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { newPasswordDataDto } from './dto/new-password-data.dto';
import { UsersToRoles } from './entities/usersToRoles.entity';
import { UpdateUserSettingsDto } from './dto/update-settings-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import sanitizeHtml from 'sanitize-html';
import { SANITIZE_CONFIG } from '../email/constants';
import { SetTicketsFilterDto } from './dto/set-tickets-filter.dto';
import { SetDeviceTokenDto } from './dto/set-device-token.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private usersProfileRepository: Repository<UserProfile>
  ) {}

  async create(registrar: User, createUserDto: CreateUserDto) {
    const result = this.usersRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      roles: createUserDto.roles.map(id => ({ role: { id } as Role } as UsersToRoles)),
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

  findAll() {
    return this.usersRepository.find({
      where: {
        support: false,
        deleted: false
      },
      relations: ['roles', 'roles.role']
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOneOrFail({
      where: { id, deleted: false },
      relations: ['roles', 'roles.role']
    });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneOrFail({
      where: { email, deleted: false }
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
      profile: {
        ...profile,
        signature: sanitizeHtml(profile.signature, SANITIZE_CONFIG)
      }
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

  async getUsersByRoles(roles: Role[]) {
    const users = await this.usersRepository.find({
      where: { deleted: false },
      relations: ['sessions', 'sessions.user', 'registrar']
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

  async updateTableSettings(idUser: number, params: UpdateUserSettingsDto) {
    const user = await this.usersRepository.findOneBy({ id: idUser });
    const userProfile = await this.usersProfileRepository.findOneBy({ id: user.profile.id });
    return await this.usersProfileRepository.save({
      ...userProfile,
      ...params
    });
  }

  async updateTicketFilters(idUser: number, params: SetTicketsFilterDto) {
    const user = await this.usersRepository.findOneBy({ id: idUser });
    const userProfile = await this.usersProfileRepository.findOneBy({ id: user.profile.id });
    return await this.usersProfileRepository.save({
      ...userProfile,
      ...params
    });
  }

  async updateDeviceToken(idUser: number, params: SetDeviceTokenDto) {
    return await this.usersRepository.update(idUser, {
      deviceToken: params.token
    });
  }
}

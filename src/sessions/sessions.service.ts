import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CustomError } from '../errors/custom-error';
import { Errors } from '../errors/errors.types';
import { User } from '../users/entities/user.entity';
import { Session } from './entities/session.entity';
import { StartSessionDto } from './dto/start-session.dto';
import { ConfirmSessionDto } from './dto/confirm-session.dto';
import { PreSession } from './entities/pre-session.entity';
import srp from 'secure-remote-password/server';
import srpClient from 'secure-remote-password/client';
import { v4 as uuid } from 'uuid';
import { StartMicrosoftSessionDto } from './dto/start-microsoft-session.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UsersToRoles } from '../users/entities/usersToRoles.entity';
import { Role } from '../roles/entities/role.entity';
import { Priority } from '../tickets/entities/priority.entity';
import { Type } from '../tickets/entities/type.entity';
import { Impact } from '../tickets/entities/impact.entity';
import { Urgency } from '../tickets/entities/urgency.entity';
import { Status } from '../tickets/entities/status.entity';
import { ALL_PERMISSIONS } from '../roles/roles.types';
import { allPermissions } from '../../migrations/1701366016898-SeedStatusTable';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionsRepository: Repository<Session>,
    @InjectRepository(PreSession)
    private readonly preSessionRepository: Repository<PreSession>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    @InjectRepository(UsersToRoles)
    private usersToRolesRepository: Repository<UsersToRoles>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Priority)
    private priorityRepository: Repository<Priority>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
    @InjectRepository(Impact)
    private impactRepository: Repository<Impact>,
    @InjectRepository(Urgency)
    private urgencyRepository: Repository<Urgency>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>
  ) {}

  findOne(id: number) {
    return this.sessionsRepository.findOneOrFail({
      where: {
        id
      },
      relations: ['user', 'user.roles', 'user.roles.role']
    });
  }

  findByUser(user: User) {
    return this.sessionsRepository.find({
      where: {
        user: {
          id: user.id
        },
        confirmed: true
      },
      relations: ['user', 'user.roles']
    });
  }

  findOneByDevice(device: string, userId: number) {
    return this.sessionsRepository.findOne({
      where: {
        deviceId: device,
        user: {
          id: userId
        }
      },
      relations: ['user', 'user.roles', 'user.roles.role']
    });
  }

  async getSessionFromToken(token: string) {
    const { dev, sub } = this.authService.verify(token) as any;
    const session = await this.findOneByDevice(dev, sub);
    if (!session || !session.confirmed) {
      throw new CustomError(Errors.AUTH_UNSUCCESSFUL);
    }
    return session;
  }

  async updateFcmToken(session: Session, fcmToken: string) {
    session.fcmToken = fcmToken;
    await this.sessionsRepository.save(session);
  }

  async startSession(startSessionDto: StartSessionDto) {
    const user = await this.usersRepository.findOne({
      where: { email: startSessionDto.username },
      relations: {
        roles: {
          role: true
        }
      }
    });
    const verifier = user?.verifier ?? srpClient.deriveVerifier(uuid());
    let salt = !user?.salt || user?.salt == '' ? srpClient.generateSalt() : user.salt;
    const serverEphemeral = srp.generateEphemeral(verifier);
    const preSession = this.preSessionRepository.create({
      username: startSessionDto.username,
      clientEphemeral: startSessionDto.clientEphemeral,
      serverEphemeralSecret: serverEphemeral.secret
    });
    const presession = await this.preSessionRepository.save(preSession);
    return {
      salt: salt,
      serverEphemeral: serverEphemeral.public,
      presessionId: presession.id
    };
  }

  async confirmSession(confirmSessionDto: ConfirmSessionDto) {
    try {
      const presession = await this.preSessionRepository.findOneBy({
        id: confirmSessionDto.presessionId
      });
      const user = await this.usersRepository.findOneBy({ email: presession.username });
      srp.deriveSession(
        presession.serverEphemeralSecret,
        presession.clientEphemeral,
        user.salt,
        presession.username,
        user.verifier,
        confirmSessionDto.clientSessionProof
      );
      const deviceId = uuid();
      const token = this.authService.createTokenForDevice(user, deviceId);
      let session = this.sessionsRepository.create({
        user,
        token,
        confirmed: true,
        deviceId: deviceId,
        fcmToken: null
      });
      session = await this.sessionsRepository.save(session);
      return this.findOne(session.id);
    } catch (error) {
      throw new CustomError(Errors.AUTH_UNSUCCESSFUL);
    }
  }

  async createRoles() {
    const roles = await this.roleRepository.find({});
    if (!roles.length) {
      const newRoles = this.roleRepository.create([
        {
          name: 'admin',
          permissions: ALL_PERMISSIONS
        },
        {
          name: 'readOnly',
          permissions: ALL_PERMISSIONS
        },
        {
          name: 'tecnician',
          permissions: ALL_PERMISSIONS
        },
        {
          name: 'supervisor',
          permissions: ALL_PERMISSIONS
        }
      ]);
      this.roleRepository.save(newRoles);
      const prioritys = this.priorityRepository.create([
        {
          id: 1,
          description: 'Bajo'
        },
        {
          id: 2,
          description: 'Medio'
        },
        {
          id: 3,
          description: 'Alto'
        },
        {
          id: 4,
          description: 'Critico'
        }
      ]);
      this.priorityRepository.save(prioritys);
      const impacts = this.impactRepository.create([
        {
          id: 1,
          description: 'Bajo'
        },
        {
          id: 2,
          description: 'Medio'
        },
        {
          id: 3,
          description: 'Alto'
        },
        {
          id: 4,
          description: 'Critico'
        }
      ]);
      this.impactRepository.save(impacts);
      const urgencys = this.urgencyRepository.create([
        {
          id: 1,
          description: 'Bajo'
        },
        {
          id: 2,
          description: 'Medio'
        },
        {
          id: 3,
          description: 'Alto'
        },
        {
          id: 4,
          description: 'Critico'
        }
      ]);
      this.urgencyRepository.save(urgencys);
      const types = this.typeRepository.create([
        {
          id: 1,
          description: 'Incidente'
        },
        {
          id: 2,
          description: 'Solicitud'
        }
      ]);
      this.typeRepository.save(types);
      const statuss = this.statusRepository.create([
        {
          id: 1,
          description: 'En espera'
        },
        {
          id: 2,
          description: 'Resuelto'
        }
      ]);
      this.statusRepository.save(statuss);
    }
  }

  async createMicrosoftSession(createSessionDto: StartMicrosoftSessionDto) {
    try {
      const userFromToken = (
        await firstValueFrom(
          this.httpService.get('https://graph.microsoft.com/v1.0/me', {
            headers: {
              Authorization: `Bearer ${createSessionDto.accessToken}`
            }
          })
        )
      ).data;
      const emailUser = userFromToken.userPrincipalName.toLowerCase();
      let user = await this.usersRepository.findOneBy({ email: emailUser });
      if (!user) {
        const usersCount = (await this.usersRepository.find({})).length;
        user = this.usersRepository.create({
          name: userFromToken.displayName,
          email: emailUser,
          status: 1,
          deleted: false,
          support: false,
          profile: {
            darkMode: false,
            skipUntrustedRedirect: false,
            trustedDomains: []
          }
        });
        user = await this.usersRepository.save(user);
        await this.createRoles();
        const userRoles = this.usersToRolesRepository.create({
          role: { id: usersCount == 0 ? 1 : 3 },
          user: { id: user.id }
        });
        this.usersToRolesRepository.save(userRoles);
      }
      const deviceId = uuid();
      const token = this.authService.createTokenForDevice(user, deviceId);
      let session = this.sessionsRepository.create({
        user,
        token,
        confirmed: true,
        deviceId: deviceId,
        fcmToken: null
      });
      session = await this.sessionsRepository.save(session);
      return this.findOne(session.id);
    } catch (error) {
      throw new CustomError(Errors.AUTH_UNSUCCESSFUL);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CustomError } from '../errors/custom-error';
import { Errors } from '../errors/errors.types';
import { User } from '../users/entities/user.entity';
import { StartGoogleSessionDto } from './dto/start-google-session.dto';
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
    private usersToRolesRepository: Repository<UsersToRoles>
  ) {}

  async createGoogleSession(createSessionDto: StartGoogleSessionDto) {
    const user = await this.authService.googleAuth(createSessionDto.accessToken);

    await this.sessionsRepository.delete({
      deviceId: createSessionDto.deviceId,
      user: {
        id: user.id
      }
    });

    const token = await this.authService.createTokenForDevice(user, createSessionDto.deviceId);

    let session = this.sessionsRepository.create({
      user,
      token,
      confirmed: true,
      deviceId: createSessionDto.deviceId,
      fcmToken: createSessionDto.fmcToken
    });

    session = await this.sessionsRepository.save(session);
    return this.findOne(session.id);
  }

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
      const emailUser = userFromToken.mail.toLowerCase();
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

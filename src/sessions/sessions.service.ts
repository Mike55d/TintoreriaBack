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

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionsRepository: Repository<Session>,
    @InjectRepository(PreSession)
    private readonly preSessionRepository: Repository<PreSession>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly authService: AuthService
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
      relations: ['user', 'user.roles', 'user.org', 'user.roles.role']
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
      relations: ['user', 'user.roles', 'user.org']
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
      relations: ['user', 'user.roles', 'user.org', 'user.roles.role']
    });
  }

  // findOneByDeviceExternalApp(device: string, appId: number) {
  //   return this.sessionsRepository.findOne({
  //     where: {
  //       deviceId: device,
  //       app: {
  //         id: appId
  //       }
  //     },
  //     relations: ['app']
  //   });
  // }

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
          role: true,
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
      const token = this.authService.createTokenForDevice(
        user,
        deviceId
      );
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

  // async authSupport(userApproval: string) {
  //   try {
  //     const presession = await this.preSessionRepository.findOneBy({
  //       userApproval
  //     });
  //     const user = await this.usersRepository.findOneBy({ email: presession.username });
  //     const deviceId = uuid();
  //     const token = this.authService.createTokenForDevice(user, deviceId);
  //     let session = this.sessionsRepository.create({
  //       user,
  //       token,
  //       confirmed: true,
  //       deviceId: deviceId,
  //       fcmToken: null
  //     });
  //     session = await this.sessionsRepository.save(session);
  //     return this.findOne(session.id);
  //   } catch (error) {
  //     throw new CustomError(Errors.AUTH_UNSUCCESSFUL);
  //   }
  // }

  // async authApplication(params: AuthApplication) {
  //   try {
  //     const app = await this.externalApplicationRepository.findOneBy({
  //       clientId: params.clientId,
  //       clientSecret: params.clientSecret
  //     });
  //     if (!app) {
  //       throw new CustomError(Errors.AUTH_UNSUCCESSFUL);
  //     }
  //     const deviceId = uuid();
  //     const token = this.authService.createTokenForDevice(null, deviceId, null, app);
  //     let session = this.sessionsRepository.create({
  //       app,
  //       token,
  //       confirmed: true,
  //       deviceId: deviceId,
  //       fcmToken: null
  //     });
  //     session = await this.sessionsRepository.save(session);
  //     return this.findOne(session.id);
  //   } catch (error) {
  //     throw new CustomError(Errors.AUTH_UNSUCCESSFUL);
  //   }
  // }
}

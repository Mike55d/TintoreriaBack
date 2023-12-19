import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomError } from '../../errors/custom-error';
import { Errors } from '../../errors/errors.types';
import { SessionsService } from '../../sessions/sessions.service';
import { Session } from '../../sessions/entities/session.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly sessionsSerive: SessionsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('SECRET_TOKEN')
    });
  }

  async validate(payload: any) {
    try {
      let session: Session;
      session = await this.sessionsSerive.findOneByDevice(payload.dev, payload.sub);
      if (!session || !session.confirmed) {
        throw new CustomError(Errors.AUTH_UNSUCCESSFUL);
      }
      session.user.currentSession = {
        ...session,
        user: null
      };
      return session.user;
    } catch (error) {
    }
  }
}

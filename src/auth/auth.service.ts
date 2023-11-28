import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { GoogleAuthService } from './google-auth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly googleAuthService: GoogleAuthService
  ) {}

  async googleAuth(token: string): Promise<User> {
    try {
      const googleInfo = await this.googleAuthService.authenticate(token);
      return await this.usersService.findOneByEmail(googleInfo.email);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  createTokenForDevice(
    user?: User,
    device?: string,
  ) {
    const payload = {
      sub: user.id,
      dev: device,
      exp: 5 * 60,
      tok: uuid(),
    };
    return this.jwtService.sign(payload);
  }

  verify(token: string) {
    return this.jwtService.verify(token, { ignoreExpiration: true });
  }
}

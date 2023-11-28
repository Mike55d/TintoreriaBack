import { Injectable, UnauthorizedException } from '@nestjs/common';
import { google, Auth } from 'googleapis';

@Injectable()
export class GoogleAuthService {
  oauthClient: Auth.OAuth2Client;

  constructor() {
    this.oauthClient = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
  }

  async authenticate(token: string) {
    try {
      return await this.oauthClient.getTokenInfo(token);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}

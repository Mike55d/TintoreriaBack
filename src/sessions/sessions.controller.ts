import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { StartGoogleSessionDto } from './dto/start-google-session.dto';
import { Public } from '../auth/guards/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { StartSessionDto } from './dto/start-session.dto';
import { ConfirmSessionDto } from './dto/confirm-session.dto';
import { StartMicrosoftSessionDto } from './dto/start-microsoft-session.dto';

@Controller('sessions')
@ApiTags('Sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Public()
  @Post('start/google')
  async startSession(@Body() startGoogleSessionDto: StartGoogleSessionDto) {
    const result = await this.sessionsService.createGoogleSession(startGoogleSessionDto);
    return result.json;
  }

  @Post('start')
  start(@Body() startSessionDto: StartSessionDto) {
    return this.sessionsService.startSession(startSessionDto);
  }

  @Post('confirm')
  confirm(@Body() confirmSessionDto: ConfirmSessionDto) {
    return this.sessionsService.confirmSession(confirmSessionDto);
  }

  @Post('start/microsoft')
  async createMicrosoftSession(@Body() createSessionDto: StartMicrosoftSessionDto) {
    return await this.sessionsService.createMicrosoftSession(createSessionDto);
  }
}

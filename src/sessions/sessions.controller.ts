import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StartSessionDto } from './dto/start-session.dto';
import { ConfirmSessionDto } from './dto/confirm-session.dto';
import { StartMicrosoftSessionDto } from './dto/start-microsoft-session.dto';
import { Session } from './entities/session.entity';

@Controller('sessions')
@ApiTags('Sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('start')
  @ApiResponse({ status: 200, description: 'Started session' })
  start(@Body() startSessionDto: StartSessionDto) {
    return this.sessionsService.startSession(startSessionDto);
  }

  @Post('confirm')
  @ApiResponse({ status: 200, description: 'Started session', type: Session })
  @ApiResponse({ status: 401, description: 'Unauthorized ' })
  confirm(@Body() confirmSessionDto: ConfirmSessionDto) {
    return this.sessionsService.confirmSession(confirmSessionDto);
  }

  @Post('start/microsoft')
  @ApiResponse({ status: 200, description: 'Started session', type: Session })
  @ApiResponse({ status: 401, description: 'Unauthorized ' })
  async createMicrosoftSession(@Body() createSessionDto: StartMicrosoftSessionDto) {
    return await this.sessionsService.createMicrosoftSession(createSessionDto);
  }
}

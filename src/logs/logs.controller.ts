import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Log } from './entities/logs.entity';
import { LogsService } from './logs.service';
import { FindLogsDto } from './dto/find-logs.dto';

@Controller('logs')
@ApiTags('Logs')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all records', type: [Log] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll(@Query() query: FindLogsDto) {
    return await this.logsService.findAll(query);
    //   const { user } = req;
    //   const result = await this.rolesService.findAll();
    //   return result.map(it => it.json);
  }
}

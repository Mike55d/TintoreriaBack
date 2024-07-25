import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogsForwardingService } from './logs-forwarding.service';
import { CreateLogsForwardingDto } from './dto/create-logs-forwarding.dto';
import { UpdateLogsForwardingDto } from './dto/update-logs-forwarding.dto';

@Controller('logs-forwarding')
export class LogsForwardingController {
  constructor(private readonly logsForwardingService: LogsForwardingService) {}

  @Post()
  create(@Body() createLogsForwardingDto: CreateLogsForwardingDto) {
    return this.logsForwardingService.create(createLogsForwardingDto);
  }

  @Get()
  findAll() {
    return this.logsForwardingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logsForwardingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogsForwardingDto: UpdateLogsForwardingDto) {
    return this.logsForwardingService.update(+id, updateLogsForwardingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logsForwardingService.remove(+id);
  }
}

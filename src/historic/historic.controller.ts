import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth,guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('historic')
@ApiTags('Historic')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Get()
  findAll() {
    return this.historicService.findAll();
  }

  @Get(':id')
  findAllByTicket(@Param('id') id: string) {
    return this.historicService.findAllByTicket(+id);
  }

  @Post(':id')
  ReplyTicket(
    @Request() req,
    @Param('id') id: string,
    @Body() createHistoryDto: CreateHistoricDto
  ) {
    try {
      return this.historicService.replyTicket(req.user.id, +id, createHistoryDto);
    } catch (error) {
      console.log(error);
    }
  }
}

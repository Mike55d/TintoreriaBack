import { Controller, Get, Param } from '@nestjs/common';
import { HistoricService } from './historic.service';

@Controller('historic')
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
}

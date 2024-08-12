import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtentionTimeService } from './atention-time.service';
import { AtentionTimeDto } from './dto/create-atention-time.dto';
import { UpdateAtentionTimeDto } from './dto/update-atention-time.dto';

@Controller('atention-time')
export class AtentionTimeController {
  constructor(private readonly atentionTimeService: AtentionTimeService) {}

  @Post()
  create(@Body() createAtentionTimeDto: AtentionTimeDto) {
    return this.atentionTimeService.create(createAtentionTimeDto);
  }

  @Get()
  findAll() {
    return this.atentionTimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atentionTimeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtentionTimeDto: UpdateAtentionTimeDto) {
    return this.atentionTimeService.update(+id, updateAtentionTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atentionTimeService.remove(+id);
  }
}

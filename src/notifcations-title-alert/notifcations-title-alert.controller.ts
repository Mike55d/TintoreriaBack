import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifcationsTitleAlertService } from './notifcations-title-alert.service';
import { CreateNotifcationsTitleAlertDto } from './dto/create-notifcations-title-alert.dto';
import { UpdateNotifcationsTitleAlertDto } from './dto/update-notifcations-title-alert.dto';

@Controller('notifcations-title-alert')
export class NotifcationsTitleAlertController {
  constructor(private readonly notifcationsTitleAlertService: NotifcationsTitleAlertService) {}

  @Post()
  create(@Body() createNotifcationsTitleAlertDto: CreateNotifcationsTitleAlertDto) {
    return this.notifcationsTitleAlertService.create(createNotifcationsTitleAlertDto);
  }

  @Get()
  findAll() {
    return this.notifcationsTitleAlertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notifcationsTitleAlertService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotifcationsTitleAlertDto: UpdateNotifcationsTitleAlertDto) {
    return this.notifcationsTitleAlertService.update(+id, updateNotifcationsTitleAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notifcationsTitleAlertService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralPricesService } from './general-prices.service';
import { CreateGeneralPriceDto } from './dto/create-general-price.dto';
import { UpdateGeneralPriceDto } from './dto/update-general-price.dto';

@Controller('general-prices')
export class GeneralPricesController {
  constructor(private readonly generalPricesService: GeneralPricesService) {}

  @Post()
  create(@Body() createGeneralPriceDto: CreateGeneralPriceDto) {
    return this.generalPricesService.create(createGeneralPriceDto);
  }

  @Get(':currencyId')
  findAll(@Param('currencyId') currencyId: string) {
    return this.generalPricesService.findAll(+currencyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalPricesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneralPriceDto: UpdateGeneralPriceDto) {
    return this.generalPricesService.update(+id, updateGeneralPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalPricesService.remove(+id);
  }
}

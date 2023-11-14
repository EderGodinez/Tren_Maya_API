import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { CreateReserveDto } from './dto/create-reserve.dto';


@Controller('reserves')
export class ReservesController {
  constructor(private readonly reservesService: ReservesService) {}
  @Post()
  create(@Body() createReserveDto: CreateReserveDto) {
    return this.reservesService.create(createReserveDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservesService.findOne(+id);
  }

}

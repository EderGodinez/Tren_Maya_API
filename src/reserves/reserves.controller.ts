import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';

@Controller('reserves')
export class ReservesController {
  constructor(private readonly reservesService: ReservesService) {}

  @Post()
  create(@Body() createReserveDto: CreateReserveDto) {
    return this.reservesService.create(createReserveDto);
  }

  @Get()
  findAll() {
    return this.reservesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReserveDto: UpdateReserveDto) {
    return this.reservesService.update(+id, updateReserveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservesService.remove(+id);
  }
}

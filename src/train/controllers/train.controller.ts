import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainService } from '../services/train.service';
import { UpdateTrainDto } from '../dto/update-train.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Trains')
@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}
  //Obtener todas las estaciones
  @Get()
  findAll() {
    return this.trainService.findAll();
  }
}

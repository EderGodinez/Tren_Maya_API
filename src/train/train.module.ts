import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Distancia,Estacion,Estado} from './entities/index'
@Module({
  imports:[TypeOrmModule.forFeature([Distancia,Estacion,Estado])],
  controllers: [TrainController],
  providers: [TrainService],
})
export class TrainModule {}

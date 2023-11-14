import { Module } from '@nestjs/common';
import { TrainService } from './services/train.service';
import { TrainController } from './train.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Asiento, Distancia,Estacion,Estado, Tren} from './entities/index'
import { ScheduleModule } from '@nestjs/schedule';
import { DailyService } from './services/dailyTasks.service';
@Module({
  imports:[
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Distancia,Estacion,Estado,Tren,Asiento])],
  controllers: [TrainController],
  providers: [TrainService,DailyService],
})
export class TrainModule {
  
}

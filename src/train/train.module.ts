import { Module } from '@nestjs/common';
import { TrainService } from './services/train.service';
import { TrainController } from './controllers/train.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distancia,Estacion,Estado, Tren} from './entities/index'
import { ScheduleModule } from '@nestjs/schedule';
//import { DailyService } from './services/dailyTasks.service';
import { StatesController } from './controllers/states.controller';
import { StatesService } from './services/states.service';
import { StationsController } from './controllers/stations.controller';
import { StationSevice } from './services/stations.service';
@Module({
  imports:[
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Distancia,Estacion,Estado,Tren])],
  controllers: [TrainController,StatesController,StationsController],
  providers: [TrainService,StatesService,StationSevice],
})
export class TrainModule {
  
}

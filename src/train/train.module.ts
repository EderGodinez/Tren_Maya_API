import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distancia,Estacion,Estado, Tren} from './entities/index'
import { ScheduleModule } from '@nestjs/schedule';
import { StatesController } from './controllers/states.controller';
import { StatesService } from './services/states.service';
import { StationsController } from './controllers/stations.controller';
import { StationSevice } from './services/stations.service';
@Module({
  imports:[
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Distancia,Estacion,Estado,Tren])],
  controllers: [StatesController,StationsController],
  providers: [StatesService,StationSevice],
})
export class TrainModule {
  
}

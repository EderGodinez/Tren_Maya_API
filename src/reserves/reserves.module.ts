import { Module } from '@nestjs/common';
import { ReservesService } from './services/reserves.service';
import { ReservesController } from './reserves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservation.entity';
import { User } from 'src/auth/entities/auth.entity';
import {  Estacion, Tren } from 'src/train/entities';
import { DailyService } from './services/dailyTasks.service';
import { ReservacionTemp } from './entities/tempReservation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Reservacion,Tren,Estacion,ReservacionTemp])],
  controllers: [ReservesController],
  providers: [ReservesService,DailyService],
})
export class ReservesModule {}

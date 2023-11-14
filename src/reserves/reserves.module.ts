import { Module } from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { ReservesController } from './reserves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservation.entity';
import { Asiento } from '../train/entities/seat.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Reservacion,Asiento])],
  controllers: [ReservesController],
  providers: [ReservesService],
})
export class ReservesModule {}

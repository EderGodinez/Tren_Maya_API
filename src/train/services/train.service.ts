import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Distancia, Estacion, Tren } from '../entities';
import { Repository } from 'typeorm';
import { TrainInfoResponse } from '../interfaces/TrainInfoResponse.interface';

@Injectable()
export class TrainService {
  constructor(@InjectRepository(Distancia) private distanceRepository:Repository<Distancia>){}

  async findAll():Promise<TrainInfoResponse[]> {
    return this.distanceRepository.query('select * from distancia')
  }
  
}

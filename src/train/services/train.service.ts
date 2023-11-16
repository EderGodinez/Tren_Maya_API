import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Distancia, Estacion, Tren } from '../entities';
import { Repository } from 'typeorm';
import { TrainInfoResponse } from '../interfaces/TrainInfoResponse.interface';

@Injectable()
export class TrainService {
  constructor(@InjectRepository(Distancia) private distanceRepository:Repository<Distancia>){}

  async findAll():Promise<TrainInfoResponse[]> {
    const distances: TrainInfoResponse[] = await this.distanceRepository.query('select * from distancia')
     console.log(distances)
    return distances;
  }
  
}

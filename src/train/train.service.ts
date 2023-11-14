import { Injectable } from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Distancia } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class TrainService {
  constructor(@InjectRepository(Distancia) private distanceRepository:Repository<Distancia>){}
  create(createTrainDto: CreateTrainDto) {
    return 'This action adds a new train';
  }

  findAll() {
    return this.distanceRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} train`;
  }

  update(id: number, updateTrainDto: UpdateTrainDto) {
    return `This action updates a #${id} train`;
  }

  remove(id: number) {
    return `This action removes a #${id} train`;
  }
}

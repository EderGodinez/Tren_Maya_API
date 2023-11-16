import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Estado } from '../entities/states.entity';
import { Repository } from "typeorm";

@Injectable()
export class StatesService {
  constructor(@InjectRepository(Estado) private EstateRepository:Repository<Estado>){}
  findAll() {
    return this.EstateRepository.find()
  }
}
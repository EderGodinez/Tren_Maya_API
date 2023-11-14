import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asiento } from '../entities';

@Injectable()
export class DailyService {
    constructor(@InjectRepository(Asiento) private SeatsRepository:Repository<Asiento>) {}
  @Cron('0 0 * * *') // Se ejecuta a la medianoche todos los días
  handleCron() {
    this.executeDailyTask();
  }
  executeDailyTask() {
    // Lógica que se ejecutará diariamente
    console.log('Horarios limpios');
    // Puedes llamar a tu endpoint o realizar cualquier operación deseada aquí
  }
}
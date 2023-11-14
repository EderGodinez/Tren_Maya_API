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
  async executeDailyTask() {
    // Lógica que se ejecutará diariamente
    console.log('Horarios limpios');
    try {
      // Actualiza todos los registros en la tabla 'asientos'
      const result = await this.SeatsRepository.update({}, { Disponibilidad: false });
      return { success: true, message: 'Actualización exitosa', result };
    } catch (error) {
      return { success: false, message: 'Error al actualizar: ' + error.message };
    }
  }
    
  
}
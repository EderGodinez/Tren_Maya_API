import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservacionTemp } from '../entities/tempReservation.entity';
//import { Asiento } from '../entities';

@Injectable()
export class DailyService {
    constructor(@InjectRepository(ReservacionTemp) private TempRepository:Repository<ReservacionTemp>) {}
private static IdTrenCounter:number=0;
    @Cron('0 6,10,14 * * *') // Se ejecuta a las 6,8,14 horas del dia
  handleCron() {
    DailyService.IdTrenCounter++;
    this.DeletePendient(DailyService.IdTrenCounter);
    if(DailyService.IdTrenCounter===3)
    DailyService.IdTrenCounter=0;
  }
  async DeletePendient(trainId:number) {
        const today = new Date();
        // Obtener año, mes y día
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');  // Los meses son 0-indexados, por eso se suma 1
        const day = today.getDate().toString().padStart(2, '0');
        const CurrentDate = `${year}-${month}-${day}`;
    try {
      const result = await this.TempRepository
      .createQueryBuilder()
      .delete()
      .from(ReservacionTemp)
      .where("Fecha_Salida = :fechaSalida", { fechaSalida: CurrentDate })
      .andWhere("TrenId = :trenId", { trenId: trainId })
      .execute();
      return { success: true, message: 'Eliminacion de reservacion pendientes', result };
    } catch (error) {
      return { success: false, message: 'Error al eliminar: ' + error.message };
    }
  }
    
  
}
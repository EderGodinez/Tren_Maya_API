import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Distancia, Estacion } from "../entities";
@Injectable()
export class StationSevice {
  constructor(@InjectRepository(Distancia) private distanceRepository:Repository<Distancia>,
              @InjectRepository(Estacion) private StationRepository:Repository<Estacion>){}
  findAll() {
    return this.StationRepository.find()
  }
  async CalculateDistance(station1Id:number,station2Id:number):Promise<number>{
    return await this.getDistance(station1Id,station2Id);
  }
  async getDistance(stationFrom: number, stationTo: number): Promise<number> {
    let totalDistance = 0;
    let currentStation = stationFrom;
    while (currentStation != stationTo) { 
      const distance = await this.distanceRepository.findOne({where: { De: currentStation }});
      if (!distance) {
        // No hay una conexión directa entre las estaciones
        return -1;
      }
      totalDistance += distance.Kms;
      currentStation = distance.A; 
    }
    return totalDistance;
  }
  
}
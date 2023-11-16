import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Distancia, Estacion } from "../entities";
import { CalculateDistanceDto } from "../dto/calculateDistance.dto";

@Injectable()
export class StationSevice {
  constructor(@InjectRepository(Distancia) private distanceRepository:Repository<Distancia>,
              @InjectRepository(Estacion) private StationRepository:Repository<Estacion>){}
  findAll() {
    return this.StationRepository.find()
  }
  async CalculateDistance(body:CalculateDistanceDto){
    const {station1Id,station2Id}=body;
    const resp=await this.getDistance(station1Id,station2Id);
    return resp
  }
  async getDistance(stationFrom: number, stationTo: number): Promise<number> {
    let totalDistance = 0;
    let currentStation = stationFrom;
    while (currentStation !== stationTo) {
      const distance = await this.distanceRepository.findOne({where: { De: currentStation }});
      if (!distance) {
        // No hay una conexión directa entre las estaciones
        return -1;
      }
      totalDistance += distance.Kms;
      currentStation = distance.A; // Siguiente estación
    }
    return totalDistance;
  }
  
}
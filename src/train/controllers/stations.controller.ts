import { Body, Controller, Get, Query } from "@nestjs/common";
import { StationSevice } from "../services/stations.service";
import { CalculateDistanceDto } from "../dto/calculateDistance.dto";

@Controller('station')
export class StationsController {
  constructor(private readonly StationService: StationSevice) {}
  //Obtener todas las estaciones
  @Get()
  findAll() {
    return this.StationService.findAll();
  }
    @Get('/distance')
    async CalculateDistance(@Query('origen') origen:number , @Query('destino') destino:number):Promise<number>{
      console.log(origen)
      console.log(destino)
       const rep=await this.StationService.CalculateDistance(origen,destino)
       console.log(rep)
       return rep
}
}
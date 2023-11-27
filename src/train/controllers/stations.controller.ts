import { Controller, Get, Query } from "@nestjs/common";
import { StationSevice } from "../services/stations.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('Stations')
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
       return await this.StationService.CalculateDistance(origen,destino)
}
}
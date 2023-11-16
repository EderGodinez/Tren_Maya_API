import { Body, Controller, Get } from "@nestjs/common";
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
    async CalculateDistance(@Body() body:CalculateDistanceDto){
        return await this.StationService.CalculateDistance(body)+' Kms'
}
}
import { Controller, Get, Query } from "@nestjs/common";
import { StationSevice } from "../services/stations.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags('Stations')
@Controller('station')
export class StationsController {
  constructor(private readonly StationService: StationSevice) {}
  //Obtener todas las estaciones
  @ApiOperation({ summary: 'Eliminar la cuenta de algun usuario mediante `id`', description: 'Para esto unicamente el `admin` solo tiene acceso por lo que ingresa con email=`admin@gmail.com` y pass=`string`' })
  @Get()
  findAll() {
    return this.StationService.findAll();
  }
  @ApiOperation({ summary: 'Obtener la distacia entre dos estaciones', description: 'Este endpoint se utiliza para que en base a la distancia sera el precio a pagar' })
    @Get('/distance')
    async CalculateDistance(@Query('origen') origen:number , @Query('destino') destino:number):Promise<number>{
       return await this.StationService.CalculateDistance(origen,destino)
}
}
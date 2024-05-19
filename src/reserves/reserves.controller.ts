import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ReservesService } from './services/reserves.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Reserves')
@Controller('reserves')
export class ReservesController {
  constructor(private readonly reservesService: ReservesService) {}
  @ApiOperation({ summary: 'Crear reservacion y pagar al mismo tiempo', description: 'Para esto se debera de tener un correo valido y un usuario id en caso de no tener cuenta `id=1`' })
  @Post()
  create(@Body() createReserveDto: CreateReserveDto) {
    return this.reservesService.create(createReserveDto);
  }
  @ApiOperation({ summary: 'Crear reservacion que quedara pendiente a pagar por 24h', description: 'Para esto se debera de tener un correo valido y un usuario id en caso de no tener cuenta `id=1`' })
  @Post('pendient')
  createLater(@Body() createReserveDto: CreateReserveDto) {
    return this.reservesService.createLater(createReserveDto);
  }
  @ApiOperation({ summary: 'Pagar una reservacion pendiente', description: 'Para esto se debe de pasar un id de reservacion pendiente y un usuario id en caso de no tener cuenta `id=1`' })
  @Post('Pay')
  Pay(@Query('Idpendient') Idpendient:number) {
    return this.reservesService.pay(Idpendient);
  }
  @ApiOperation({ summary: 'Consultar todas las reservaciones pendientes', description: 'Para esto se debe de pasar un email y un usuario id en caso de no tener cuenta `id=1`' })
  @Get('pendient')
  findpendient(@Query('email') email:string,@Query('id') userid:string) {
    return this.reservesService.findpendient(email,userid);
  }
  @ApiOperation({ summary: 'Consultar todas las reservaciones ya pagadas', description: 'Para esto se debe de pasar un email y un usuario id en caso de no tener cuenta `id=1`' })
  @Get('paid')
  findOne(@Query('email') email:string,@Query('id') userid:string) {
    return this.reservesService.findOne(userid,email);
  }
  
  //  @Get()
  //  findRegisterUser(@Query('email') email:string) { 
  //     return this.reservesService.findOneByEmail(email);
  // }
}

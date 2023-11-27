import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ReservesService } from './services/reserves.service';
import { CreateReserveDto } from './dto/create-reserve.dto';


@Controller('reserves')
export class ReservesController {
  constructor(private readonly reservesService: ReservesService) {}
  @Post()
  create(@Body() createReserveDto: CreateReserveDto) {
    return this.reservesService.create(createReserveDto);
  }
  @Post('pendient')
  createLater(@Body() createReserveDto: CreateReserveDto) {
    return this.reservesService.createLater(createReserveDto);
  }
  @Post('Pay')
  Pay(@Query('Idpendient') Idpendient:number) {
    return this.reservesService.pay(Idpendient);
  }
  @Get('pendient')
  findpendient(@Query('email') email:string,@Query('id') userid:string) {
    return this.reservesService.findpendient(email,userid);
  }
  @Get('paid')
  findOne(@Query('email') email:string,@Query('id') userid:string) {
    return this.reservesService.findOne(userid,email);
  }
  
   @Get()
   findRegisterUser(@Query('email') email:string) { 
      return this.reservesService.findOneByEmail(email);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReserveDto } from '../dto/create-reserve.dto';
import { User } from 'src/auth/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservacion } from '../entities/reservation.entity';
import {  Repository } from 'typeorm';
import {  Estacion, Tren } from 'src/train/entities';
import { ReservacionTemp } from '../entities/tempReservation.entity';

@Injectable()
export class ReservesService {
  constructor(@InjectRepository(User) private  user:Repository<User>,
              @InjectRepository(Reservacion) private  reservation:Repository<Reservacion>,
              @InjectRepository(Tren) private  tren:Repository<Tren>,
              @InjectRepository(Estacion) private  ESTACION:Repository<Estacion>,
              @InjectRepository(ReservacionTemp) private  Temp:Repository<ReservacionTemp>){}
              //crear reservaciones
  async create(createReserveDto: CreateReserveDto) {
    
    const {ID_Usuario,fecha_salida,ID_Tren,...rest}=createReserveDto
    // Verifica si el usuario existe antes de realizar la reserva
    const userExist = await this.user.findOne({where:{ id: ID_Usuario }});
    const occupiedSeat = await this.reservation
  .createQueryBuilder()
  .select('SUM(Numero_pasajeros)', 'sum')
  .where({ Fecha_Salida: fecha_salida ,TrenId:ID_Tren})
  .getRawOne()
    if (!userExist) {
      throw new HttpException(`Usuario no existe.`,HttpStatus.NOT_FOUND);
    }
     if((parseInt(occupiedSeat.sum)+rest.Numero_Pasajeros)>100)
     throw new HttpException(`Error al momento de tratar de realizar reservacion limite de pasajeros es de 100. Numero de disponibles ${100-occupiedSeat.sum}`,HttpStatus.CONFLICT);
    const estacion_destino=await this.ESTACION.findOne({where:{id:rest.Destino}})
    const estacion_origen=await this.ESTACION.findOne({where:{id:rest.Origen}})
    const tren=await this.tren.findOne({where:{id:ID_Tren}})
    const nuevaReservacion= this.reservation.create({
      UserId:userExist,
      Origen:estacion_origen,
      Destino:estacion_destino,
      Numero_pasajeros:rest.Numero_Pasajeros,
      Fecha_Salida:fecha_salida,
      TrenId:tren,
      ReservationEmail:rest.email
    })
    this.reservation.save(nuevaReservacion);
    return {
      message:`Reservacion guardada con exito a ${nuevaReservacion.Destino.nombre} a las ${nuevaReservacion.TrenId.horaSalida}`,
      code:200,
      summary:'success'
    }

  }//obtener reservaciones en base a lo que es el userid
  async findOne(id: number) {
    if (!this.userexist(id)) {
      throw new HttpException(`Usuario no existe.`,HttpStatus.NOT_FOUND);
    }
    const user=await this.user.findOne({where:{id}})
    return this.reservation.find({where:{UserId:user}})
  }
  async findOneByEmail(email: string) {
    const userReservationsByEmail = await this.userexistByEmail(email);
    if (!userReservationsByEmail) {
      throw new HttpException(`Usuario no existe.`, HttpStatus.NOT_FOUND);
    }
    return userReservationsByEmail;
  }
  
  async userexistByEmail(email: string) {
    const userExist = await this.reservation.findOne({ where: { ReservationEmail: email } });
    return userExist;
  }
  async userexist(id:number){
    const userExist = await this.user.findOne({where:{ id }});
    return userExist?true:'false'
  }
  async createLater(createReserveDto: CreateReserveDto) {
    const {ID_Usuario,fecha_salida,ID_Tren,...rest}=createReserveDto
    // Verifica si el usuario existe antes de realizar la reserva
    const userExist = await this.user.findOne({where:{ id: ID_Usuario }});
    const occupiedSeat = await this.reservation
  .createQueryBuilder()
  .select('SUM(Numero_pasajeros)', 'sum')
  .where({ Fecha_Salida: fecha_salida ,TrenId:ID_Tren})
  .getRawOne()
    if (!userExist) {
      throw new HttpException(`Usuario no existe.`,HttpStatus.NOT_FOUND);
    }
     if((occupiedSeat.sum+rest.Numero_Pasajeros)>100)
     throw new HttpException(`Error al momento de tratar de realizar reservacion limite de pasajeros es de 100. Numero de disponibles ${100-occupiedSeat.sum}`,HttpStatus.CONFLICT);
    const estacion_destino=await this.ESTACION.findOne({where:{id:rest.Destino}})
    const estacion_origen=await this.ESTACION.findOne({where:{id:rest.Origen}})
    const tren=await this.tren.findOne({where:{id:ID_Tren}})
    const nuevaReservacion= this.Temp.create({
      UserId:userExist,
      Origen:estacion_origen,
      Destino:estacion_destino,
      Numero_pasajeros:rest.Numero_Pasajeros,
      Fecha_Salida:fecha_salida,
      TrenId:tren,
      Email:rest.email
    })
    const reservacionCreada = await this.Temp.save(nuevaReservacion);
    return {
      message:`Reservacion guardada con exito a ${nuevaReservacion.Destino.nombre} a las ${nuevaReservacion.TrenId.horaSalida}`,
      code:200,
      summary:'success'
    }
  }
  async pay(Idpendient:number){
    const pendient= await this.Temp.findOne({where:{ID_Reservacion:Idpendient}})
    const {TrenId,Fecha_Salida,...rest}=pendient
    const occupiedSeat = await this.reservation
    .createQueryBuilder()
    .select('SUM(Numero_pasajeros)', 'sum')
    .where({ Fecha_Salida ,TrenId})
    .getRawOne()
    if((occupiedSeat.sum+rest.Numero_pasajeros)>100)
     throw new HttpException(`Error al momento de tratar de realizar reservacion limite de pasajeros es de 100. Numero de disponibles ${100-occupiedSeat.sum}`,HttpStatus.CONFLICT);
     const nuevaReservacion= this.reservation.create({
      UserId:rest.UserId,
      Origen:rest.Origen,
      Destino:rest.Destino,
      Numero_pasajeros:rest.Numero_pasajeros,
      Fecha_Salida:Fecha_Salida,
      TrenId,
      ReservationEmail:rest.Email,
    })
    this.Temp.delete(pendient)
    const reservacionCreada = await this.reservation.save(nuevaReservacion);
    return reservacionCreada;

  }

}

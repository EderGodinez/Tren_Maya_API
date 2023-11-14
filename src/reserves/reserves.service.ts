import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { User } from 'src/auth/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservesService {
  constructor(@InjectRepository(User) private  user:Repository<User>,
              @InjectRepository(Reservacion) private  reservation:Repository<Reservacion>){}
              //crear reservaciones
  async create(createReserveDto: CreateReserveDto) {
    const {ID_Usuario,...rest}=createReserveDto
    // Verifica si el usuario existe antes de realizar la reserva
    const userExist = await this.user.findOne({where:{ id: ID_Usuario }});
    if (!userExist) {
      throw new HttpException(`Usuario no existe.`,HttpStatus.NOT_FOUND);
    }
    const nuevaReservacion= this.reservation.create({
      UserId:userExist,
      Origen:rest.Origen,
      Destino:rest.Destino,
      Numero_Pasajeros:rest.Numero_Pasajeros,
      Numero_Tren:rest.ID_Tren
    })
    const reservacionCreada = await this.reservation.save(nuevaReservacion);
    return reservacionCreada;

  }//obtener reservaciones en base a lo que es el userid
  async findOne(id: number) {
    if (!this.userexist(id)) {
      throw new HttpException(`Usuario no existe.`,HttpStatus.NOT_FOUND);
    }
    const user=await this.user.findOne({where:{id}})
    return this.reservation.find({where:{UserId:user}})
  }
  async userexist(id:number){
    const userExist = await this.user.findOne({where:{ id: id }});
    return userExist?true:'false'
  }
}

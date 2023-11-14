import { User } from 'src/auth/entities/auth.entity';
import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({name:'reservaciones'})
export class Reservacion {
  @PrimaryGeneratedColumn({type:'int'})
  ID_Reservacion: number;
  @OneToOne(()=>User)
  @JoinColumn({name:'UserId'})
  UserId: User;
  @Column({ type:'int',nullable: true })
  Numero_Tren: number;
  @Column({ nullable: true,default: () => 'CURRENT_TIMESTAMP'})
  Fecha_Reserva: Date;
  @Column({type:'int' })
  Origen: number;
  @Column({nullable: true })
  Destino: number;
  @Column({ nullable: true })
  Numero_Pasajeros: number;
}
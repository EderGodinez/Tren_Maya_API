import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({name:'reservaciones'})
export class Reservacion {
  @PrimaryColumn()
  ID_Reservacion: number;
  @Column({ nullable: true })
  ID_Usuario: number;
  @Column({ length: 10, nullable: true })
  Numero_Tren: string;
  @Column({type:'int'})
  Horario:number
  @Column({ nullable: true,default: () => 'CURRENT_TIMESTAMP'})
  Fecha_Reserva: Date;
  @Column({ nullable: true })
  Fecha_Viaje: Date;
  @Column({ length: 50, nullable: true })
  Origen: string;
  @Column({ length: 50, nullable: true })
  Destino: string;
  @Column({ nullable: true })
  Numero_Pasajeros: number;
}
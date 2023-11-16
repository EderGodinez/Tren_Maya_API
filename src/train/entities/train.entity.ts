import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tren' })
export class Tren {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'Hora_Salida', type: 'time', nullable: true })
  horaSalida: string;

}
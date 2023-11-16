import { User } from "src/auth/entities/auth.entity";
import { Tren, Estacion } from "src/train/entities";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";

@Entity({name:'reservaciones_temp'})
export class ReservacionTemp {
  @PrimaryGeneratedColumn({type:'int'})
  ID_Reservacion: number;
  @ManyToOne(()=>User,{ eager: true })
  @JoinColumn({name:'UserId',referencedColumnName: 'id' })
  UserId: User;
  @ManyToOne(()=>Tren,{ eager: true })
  @JoinColumn({name:'TrenId',referencedColumnName: 'id' })
  TrenId: Tren;
  @Column({default: () => 'CURRENT_TIMESTAMP'})
  Fecha_Reserva: Date;
  @Column({type:'date'})
  Fecha_Salida: Date;
  @ManyToOne(() => Estacion, { eager: true }) // Usa `ManyToOne` para la relación muchos a uno
  @JoinColumn({ name: 'Origen', referencedColumnName: 'id' }) // Especifica la columna de la clave externa
  Origen: Estacion;
  @ManyToOne(() => Estacion, { eager: true }) // Usa `ManyToOne` para la relación muchos a uno
  @JoinColumn({ name: 'Destino', referencedColumnName: 'id' }) // Especifica la columna de la clave externa
  Destino: Estacion;
  @Column({ type:'tinyint' })
  Numero_pasajeros: number;
  @Column({ type:'varchar',length:30 })
  Email: string;
}
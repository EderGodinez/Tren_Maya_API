import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity({name:'asientos'})
export class Asiento {
  @PrimaryColumn()
  ID_Asiento: number;

  @Column({ nullable: true })
  ID_Tren: number;

  @Column({ default:false })
  Disponibilidad: boolean; // Assuming Disponibilidad is a boolean

  // Getters, setters, and other methods can be added if needed
}

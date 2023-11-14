import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({name:'estaciones'})
export class Estacion {
  @PrimaryColumn()
  id: number;

  @Column()
  Tramo: number;

  @Column({ length: 30, charset: 'utf8', collation: 'utf8_spanish_ci' })
  nombre: string;

  @Column()
  Estado: number;

  @Column()
  tipo: number;

  // Getters, setters, and other methods can be added if needed
}
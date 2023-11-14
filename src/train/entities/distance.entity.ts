import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({name:'distancia'})
export class Distancia {
  @PrimaryColumn()
  De: number;

  @PrimaryColumn()
  A: number;

  @Column()
  Kms: number;

  // Getters, setters, and other methods can be added if needed
}
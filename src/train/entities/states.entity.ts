import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({name:'estados'})
export class Estado {
  @PrimaryColumn()
  id: number;

  @Column({ length: 3, nullable: true })
  abr: string | null;

  @Column({ length: 19, nullable: true })
  nombre: string | null;

  // Getters, setters, and other methods can be added if needed
}
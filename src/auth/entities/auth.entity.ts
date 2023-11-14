import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn({type:'int'})
    id: number;
    @Column({unique:true,default:''})
    email:string
    @Column({length:50,type:'varchar',default:''})
    userName: string;
    @Column({length:100,type:'varchar'})
    password: string;
    @Column({length:20,type:'varchar',nullable:true})
    CURP:string
    @Column({type:'int'})
    Estado:number
    @Column({type:'date'})
    fecha_nac:Date
    @Column({length:30,type:'varchar',nullable:true})
    INE:string
}
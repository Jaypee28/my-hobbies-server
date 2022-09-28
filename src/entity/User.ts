import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Hobby } from './Hobby';

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;
    
    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Hobby, (hobby) => hobby.user)
    hobbies: Hobby[]
}
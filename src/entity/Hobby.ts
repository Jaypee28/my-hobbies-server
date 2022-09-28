import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Hobby{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    img: string;

    @Column()
    deleted: boolean;

    @ManyToOne(() => User, (user) => user.hobbies)
    user: User

}
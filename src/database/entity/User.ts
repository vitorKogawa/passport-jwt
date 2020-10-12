import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcryptjs'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 8)
    }
}

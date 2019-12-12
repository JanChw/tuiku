import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from "typeorm";
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import { Role } from "../role/role.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    @Exclude()
    password: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    @ManyToMany(type => Role, role => role.users)
    @JoinTable()
    roles: Role[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword () {
        this.password = await bcrypt.hash(this.password, 10)
    }

    async comparePassword (password) {
        return await bcrypt.compare(password, this.password)
    }
}
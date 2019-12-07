import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    body: string

    @Column()
    source: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
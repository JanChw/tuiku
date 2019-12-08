import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Post } from "../post/post.entity";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    subject: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    @ManyToMany(type => Post, post => post.subjects)
    @JoinTable()
    posts: Post[]
}
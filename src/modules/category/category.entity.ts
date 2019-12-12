import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Post } from "../post/post.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    category: string

    @Column()
    alias: string

    @ManyToMany(type => Post, post => post.categories)
    @JoinTable()
    posts: Post[]

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
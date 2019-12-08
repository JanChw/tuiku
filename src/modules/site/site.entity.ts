import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Post } from "../post/post.entity";

@Entity()
export class Site {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    site: string

    @Column()
    source: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    @OneToMany(type => Post, post => post.site)
    posts: Post[]
}
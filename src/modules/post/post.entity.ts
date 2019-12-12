import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm'
import { Site } from '../site/site.entity'
import { Subject } from '../subject/subject.entity'
import { Category } from '../category/category.entity'
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

    @ManyToOne(type => Site, site => site.posts)
    site: Site

    @ManyToMany(type => Subject, subject => subject.posts)
    subjects: Subject []

    @ManyToMany(type => Category, category => category.posts)
    categories: Category[]
}
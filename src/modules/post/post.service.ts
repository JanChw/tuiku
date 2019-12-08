import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { SiteService } from '../site/site.service';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class PostService {
    constructor (
        
        @InjectRepository(Post)
        private readonly post: Repository<Post>,
        private readonly siteService: SiteService,
        private readonly subjectService: SubjectService
        

    ) {}

    async index () {
        return await this.post.find({
            relations: ['site', 'subjects']
        })
    }

    async show (id: number) {
        return await this.post.findOne(id, {
            relations: ['site', 'subjects']
        })
    } 

    async store (data: PostDto) {
        let { site, subjects } = data
        site = await this.siteService.createIfNotExist(site)
        
        subjects = await this.subjectService.createIfNotExist(subjects)
        
        return await this.post.save(data)
    }

    async update (id: number, data: Partial<PostDto>) {
        // return await this.post.update(id, data)
        let post = await this.post.findOne(id, {
            relations: ['site', 'subjects']
        })

        let { site, subjects } = data
        if (site) {
            site = await this.siteService.createIfNotExist(site)
        }

        if (subjects) {
            subjects = await this.subjectService.createIfNotExist(subjects)
        }

        console.log(data)

        post = Object.assign(post, data)
        
        return await this.post.save(post)
    }

    async destroy (ids: number[]) {
        return await this.post.delete(ids)
    }


}

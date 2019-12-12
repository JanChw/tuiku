import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from './site.entity';
import { SiteDto } from './site.dto';

@Injectable()
export class SiteService {
    constructor (
        @InjectRepository(Site)
        private readonly site: Repository<Site>
    ) {}

    async index () {
        return await this.site.find({
            relations: ['posts']
        })
    }

    async show (id: number) {
        console.log('==============')
        console.log(id)
        // return await this.site.createQueryBuilder()
        //     .relation(Site, 'posts')
        //     .of(id)
        //     .loadMany()
        return await this.site.findOne(id, {
            relations: ['posts']
        })
    }

    async store (data: SiteDto) {
        return await this.site.save(data)
    } 

    async createIfNotExist (data: SiteDto) {
        let site = await this.site.findOne(data)
        if (!site) {
            site = await this.site.save(data)
        }
        return site
    }

    async destroy (ids: number[]) {
        return await this.site.delete(ids)
    }

    async update (id: number, data: Partial<SiteDto>) {
        return await this.site.update(id, data)
    }
    
}

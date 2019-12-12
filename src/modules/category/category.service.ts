import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';
import { Post } from '../post/post.entity';
import { PostService } from '../post/post.service';
import { Actions } from 'src/core/enums/actions.enum';

@Injectable()
export class CategoryService {
    constructor (
        @InjectRepository(Category)
        private readonly category: Repository<Category>,
        private readonly postService: PostService
    ) {}

    async index () {
        return await this.category.find({relations: ['posts']})
    }

    async store (data: CategoryDto) {
        return await this.category.save(data)
    }

    async destroy (id: number) {
        return await this.category.delete(id)
    }

    async update (id: number, data: Partial<CategoryDto>) {
        let category = await this.category.findOne(id, { relations: ['posts']})
        category = Object.assign(category, data)
        // return await this.category.update(id, data)
        console.log(category)
        return await this.category.save(category)
    }


    async getPostsByCategory (category: string) {
        return await this.category.findOne({ category }, {
            relations: ['posts']
        })
    }

    async DeleteOrAddPostToCategory (type: Actions, id: number, ids?: number[]) {

        let category = await this.category.findOne(id, { relations: ['posts']})
        if (type === Actions.Add) {
            let _posts = await this.postService.findByIds(ids)
            category.posts.push(..._posts)
        }

        if (type === Actions.DEL) {
            let _posts = category.posts.filter(post => !ids.includes(post.id))
            category.posts = _posts
        }

        if (type === Actions.DELAll) {
            category.posts = []
        }
        
        
        return await this.category.save(category)

    }
}

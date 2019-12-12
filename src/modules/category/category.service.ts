import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor (
        @InjectRepository(Category)
        private readonly category: Repository<Category>
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
        return await this.category.update(id, data)
    }

    async getPostsByCategory (category: string) {
        return await this.category.findOne({ category }, {
            relations: ['posts']
        })
    }
}

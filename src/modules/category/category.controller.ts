import { Controller, Get, Post, Body, Delete, Query, ParseIntPipe, Put, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';


@Controller('category')
export class CategoryController {
    constructor (
        private readonly categoryService: CategoryService
    ) {}
    
    @Get()
    async index () {
        return this.categoryService.index()
    }

    @Post()
    async store (@Body() data: CategoryDto) {
        return this.categoryService.store(data)
    }

    @Delete(':id')
    async destroy (@Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.destroy(id)
    }

    @Put(':id')
    async update (@Param('id', ParseIntPipe) id: number, @Body() data: Partial<CategoryDto>) {
        return await this.categoryService.update(id, data)
    }

    @Get()
    async getPostsByCategory (@Query('category') category: string) {
        return await this.categoryService.getPostsByCategory(category)
    }
}

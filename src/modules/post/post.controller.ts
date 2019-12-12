import { Controller, Get, Query, ParseIntPipe, Body, Post, Put, Delete, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { Ids } from 'src/core/decorators/ids.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
    constructor (
        private readonly postService: PostService
    ) {}

    @Get()
    async index () {
        return this.postService.index()
    }

    @Get(':id')
    async show (@Param('id', ParseIntPipe) id: number) {

        let post = await this.postService.show(id)

        if (!post) {
            throw new NotFoundException('文章不存在或已被删除！')
        }

        return post
    }

    @Post()
    async store (@Body() data: PostDto) {
        return await this.postService.store(data)
    }

    @Put(':id')
    async update (@Param('id', ParseIntPipe) id: number, @Body() data: Partial<PostDto>) {
        return await this.postService.update(id, data)
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    async destory (@Ids() ids: number[]) {
        return this.postService.destroy(ids)
    }


    


}

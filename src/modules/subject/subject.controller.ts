import { Controller, Get, Post, Query, ParseIntPipe, Put, Delete, Param } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectDto } from './subject.dto';
import { Ids } from 'src/core/decorators/ids.decorator';

@Controller('subject')
export class SubjectController {
    constructor (
        private readonly subjectService: SubjectService
    ) {}

    @Get()
    async index () {
        return await this.subjectService.index()
    }

    @Get(':id')
    async showSubjectPosts (@Param('id', ParseIntPipe) id: number) {
        return await this.subjectService.show(id)
    }

    @Post()
    async store (data: SubjectDto) {
        return await this.subjectService.store(data)
    }

    @Put(':id')
    async update (@Query('id', ParseIntPipe)id: number, data: SubjectDto) {
        return await this.subjectService.update(id, data)
    }

    @Delete(':ids')
    async destroy (@Ids() ids: number[]) {
        return await this.subjectService.destroy(ids)
    }
}

import { Controller, Get, Body, Post, Put, Query, ParseIntPipe, Delete, Param } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteDto } from './site.dto';
import { Ids } from 'src/core/decorators/ids.decorator';

@Controller('site')
export class SiteController {
    constructor (
        private readonly siteService: SiteService
    ) {}

    @Get()
    async index () {
        return await this.siteService.index()
    }

    @Post()
    async store (@Body() data: SiteDto) {
        return await this.siteService.store(data)
    }

    @Put(':id')
    async update (@Param('id', ParseIntPipe) id: number, @Body() data: Partial<SiteDto>) {
        return await this.siteService.update(id, data)
    }

    @Delete()
    async destroy (@Ids() ids: number[]) {
        return await this.siteService.destroy(ids)
    }

    @Get(':id')
    async showSitePosts (@Param('id', ParseIntPipe) id: number) {
        console.log(id)
        return await this.siteService.show(id)
    }
}

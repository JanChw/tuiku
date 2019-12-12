import { Controller, Post, Body, Query, ParseIntPipe, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';
import { Role } from './role.entity';

@Controller('role')
export class RoleController {
    constructor (
        private readonly roleService: RoleService
    ) {}

    @Post()
    async store (@Body() data: RoleDto) {
        return await this.roleService.store(data)
    }

}

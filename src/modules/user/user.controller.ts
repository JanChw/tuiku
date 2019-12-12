import { Controller, Post, Body, Put, ParseIntPipe, Param, UseInterceptors, ClassSerializerInterceptor, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';

import { UserDto, UpdateUserPasswordDto } from './user.dto';
import { Role } from '../role/role.entity';
import { AuthGuard } from '@nestjs/passport';
import { AccessGuard } from 'src/core/guards/access.guard';
import { Permissions } from 'src/core/decorators/perssions.decorator';
import { UserRole } from 'src/core/enums/user-role.enum';

@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService
    ) {}

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async store (@Body() data: UserDto) {
        return await this.userService.store(data)
    }

    @Put(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async updatePassword (@Param('id', ParseIntPipe) id: number, @Body() data: Partial<UpdateUserPasswordDto>) {
        console.log(data)
        return await this.userService.updatePassword(id, data)
    }

    @Put(':id/roles')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('jwt'), AccessGuard)
    @Permissions({role: UserRole.SUPERADMIN})
    async updateRoles (@Param('id', ParseIntPipe) id: number, @Body('roles') data: UserRole[]) {
        return await this.userService.updateRoles(id, data)
    }


}

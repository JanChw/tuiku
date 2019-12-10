import { Controller, Post, Body, Put, ParseIntPipe, Param, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { UserService } from './user.service';

import { UserDto, UpdateUserPasswordDto } from './user.dto';

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

}

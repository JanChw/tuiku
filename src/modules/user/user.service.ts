import { Injectable, NotFoundException, BadRequestException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto, UpdateUserPasswordDto } from './user.dto'
import { RoleService } from '../role/role.service';
import { UserRole } from 'src/core/enums/user-role.enum';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private readonly user: Repository<User>,
        private readonly roleService: RoleService
    ) {}

    async store (data: UserDto) {
    //    return await this.user.save(data)
    let user = await this.user.create(data)
    await this.user.save(user)
    return user
    }

    async updatePassword (id: number, data: Partial<UpdateUserPasswordDto>) {
        // return await this.user.update(id, data)
        let entity = await this.user.findOne(id)

        if (!entity) {
            throw new NotFoundException('用户不存在')
        }
        let { password, newPassword } = data
        let isEquals = await entity.comparePassword(password)
        if (!isEquals) {
            throw new BadRequestException('输入密码错误，请重新输入原始密码')
        }

        entity.password = newPassword
        return this.user.save(entity)
    }

    async findByEmail (email: string) {
        return await this.user.findOne({ email }, { relations: [
            'roles'
        ]})
    }
    
    async updateRoles (id: number, data: UserRole []) {
        let user = await this.user.findOne(id)
        
        if (user) {
            let _roles = await this.roleService.findByNames(data)
            user.roles = _roles
        }

        return await this.user.save(user)
    }
}

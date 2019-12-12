import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from './role.dto';
import { UserRole } from 'src/core/enums/user-role.enum';

@Injectable()
export class RoleService {
    constructor (
        @InjectRepository(Role)
        private readonly role: Repository<Role>
    ) {}

    async store (data: RoleDto) {
        await this.role.save(data)
    }

    async findByNames (names: UserRole []) {
        // return await this.role.findOne( { name })
        let roles = await this.role.createQueryBuilder('role')
            .where('role.name in (:...names)', { names })
            .getMany()

        console.log(roles)
        return roles
    }
}

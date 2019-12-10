import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt'
import { Entity } from 'typeorm';
import { palegoldenrod } from 'color-name';
@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login (data: LoginDto) {
        let { email, password } = data
        let user = await this.userService.findByEmail(email)
        if (!user) throw new NotFoundException('用户不存在')

        let isEquals = await user.comparePassword(password)
        if (!isEquals) throw new UnauthorizedException('密码错误')

        let payload = { id: user.id, email }

        let token = this.jwtService.sign(payload)

        return {...payload, token}
    }
}

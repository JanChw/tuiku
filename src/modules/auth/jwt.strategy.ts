import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserService } from "../user/user.service";
import { JwtPayload } from "./auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'tuiku_demo'
        })
    }

    async validate (payload: JwtPayload) {
        let { email } = payload
        let user = await this.userService.findByEmail(email)
        if (!user) throw new UnauthorizedException('用户不存在')
        delete user.password

        console.log(user)
        return user

    }

}
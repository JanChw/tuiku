import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    let { email, password } = req.body
    if (!email || !password) {
      throw new BadRequestException('邮箱或密码必填')
    }
    let emailReg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    let passwordReg = /[a-zA-Z0-9]{6,12}/

    if (!emailReg.test(email)) throw new BadRequestException('请输入正确邮箱')

    if (!passwordReg.test(password)) throw new BadRequestException('请输入正确格式密码，长度等于大于6小于12')
    next();
  }
}

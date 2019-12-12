import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor (private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    let user = context.switchToHttp().getRequest().user
    let permissions = this.reflector.get('permissions', context.getHandler())

    console.log(user)
    console.log(permissions)

    let permissionsResult = permissions.map(({ role }) => {
      return role && user.roles.some(userRole => userRole.name === role)
    })

    console.log(permissionsResult)

    return permissionsResult.includes(true)
  }
}

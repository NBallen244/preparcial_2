/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {user} = context.switchToHttp().getRequest();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const hasRole = requiredRoles.some(role => user.roles?.includes(role));
        if (!hasRole) {
            throw new HttpException('No autorizado', HttpStatus.FORBIDDEN);
        }
        return true;
    }
}

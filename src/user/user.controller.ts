/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UserService } from './user.service';
import { Roles } from '../role/role.decorator';
import { RoleGuard } from '../role/role.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
@UseInterceptors(BusinessErrorsInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Listar usuarios', description: 'Este endpoint permite obtener todos los usuarios. Requiere rol de admin.' })
    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Asignar roles a usuario', description: 'Este endpoint permite asignar roles existentes a un usuario. Requiere rol de admin.' })
    @Patch(':id/roles')
    async asignRolesToUser(@Body() body: {roles: string[]}, @Param('id') id: string) {
        return await this.userService.asignRolesToUser(id, body);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obtener perfil propio', description: 'Este endpoint permite obtener los datos del usuario autenticado.' })
    @Get('me')
    async getMe(@Request() req) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return await this.userService.getMe(req.user.userId as string);
    }
}

/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UserService } from './user.service';
import { Roles } from '../role/role.decorator';
import { RoleGuard } from '../role/role.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseInterceptors(BusinessErrorsInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    @Patch(':id/roles')
    async asignRolesToUser(@Body() body: {roles: string[]}, @Param('id') id: string) {
        return await this.userService.asignRolesToUser(id, body);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('me')
    async getMe(@Request() req) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return await this.userService.getMe(req.user.userId as string);
    }
}

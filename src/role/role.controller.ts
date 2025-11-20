/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';
import { plainToInstance } from 'class-transformer';
import { RoleEntity } from './role.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { Roles } from './role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from './role.guard';

@Controller('roles')
@UseInterceptors(BusinessErrorsInterceptor)
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) {}
    
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createRole(@Body() roleData:RoleDto) {
        const role = plainToInstance(RoleEntity, roleData);
        return await this.roleService.createRole(role);
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async getRoles() {
        return await this.roleService.getRoles();
    }
}

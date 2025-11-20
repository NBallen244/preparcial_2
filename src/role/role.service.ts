/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { BussinessError, BussinessLogicException } from 'src/shared/errors/bussiness-errors';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity) 
        private readonly roleRepository:Repository<RoleEntity>) 
    {}
    async getRoles(): Promise<RoleEntity[]> {
        try {
        return await this.roleRepository.find({select:['id','role_name', 'description']});
        } catch (error) {
            throw new BussinessLogicException('Error al obtener los roles', BussinessError.INTERNAL_SERVER_ERROR);
        }
    }
    async createRole(role: RoleEntity): Promise<{message: string, roleId: string}> {
        try {
        if (role.role_name=== '' || !role.role_name) {
            throw new BussinessLogicException('role_name es requerido', BussinessError.BAD_REQUEST);
        }
        const existingRole = await this.roleRepository.findOne({where: {role_name: role.role_name}});
        if (existingRole) {
            throw new BussinessLogicException('role_name ya existe', BussinessError.CONFLICT);
        }else{
        const savedRole = await this.roleRepository.save(role);
        return {message: 'Rol creado con éxito', roleId: savedRole.id};}}
        catch (error) {
            if (error instanceof BussinessLogicException) {
                throw error;
            }
            throw new BussinessLogicException('Error al crear el rol', BussinessError.INTERNAL_SERVER_ERROR);
        }
    }
}

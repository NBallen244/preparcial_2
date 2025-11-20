/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { BussinessError, BussinessLogicException } from '../shared/errors/bussiness-errors';
import { RoleEntity } from '../role/role.entity';

@Injectable()
export class UserService {
    private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ) {}

    async registerUser(user:UserEntity, roles: string[]): Promise<{message: string, userId: string}> {
        const isEmailValid = this.emailRegex.test(user.email);
        if (!isEmailValid) {
            throw new BussinessLogicException('Email inválido', BussinessError.BAD_REQUEST);
        }
        const previousUser = await this.userRepository.findOne({where: {email: user.email}});
        if (previousUser) {
            throw new BussinessLogicException('Email ya registrado', BussinessError.CONFLICT);
        }
        const rolesEntities: RoleEntity[] = [];
        for (const roleName of roles) {
            const role = await this.roleRepository.findOne({where: {role_name: roleName}});
            if (!role) {
                throw new BussinessLogicException(`roles inválidos`, BussinessError.BAD_REQUEST);
            }
            rolesEntities.push(role);
        }
        user.roles = rolesEntities;
        const savedUser = await this.userRepository.save(user);
        return {message: 'Usuario registrado con éxito', userId: savedUser.id};
    }

    async getUsers(): Promise<UserEntity[]> {
        try {
        return await this.userRepository.find({relations: ['roles'], select:['id','email','name']});
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new BussinessLogicException('Error al obtener los usuarios', BussinessError.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserByEmail(email: string): Promise<UserEntity|null> {
        return await this.userRepository.findOne({where: {email}, relations: ['roles']});
    }

    async getMe(userId: string): Promise<UserEntity|null> {
        return await this.userRepository.findOne({where: {id: userId}, relations: ['roles'], select:['id','email','name']});
    }

    async asignRolesToUser(userId: string, {roles}: {roles: string[]}): Promise<{message: string}> {
        const user =  await this.userRepository.findOne({where: {id: userId}, relations: ['roles']});
        if (!user) {
            throw new BussinessLogicException('Usuario no encontrado', BussinessError.NOT_FOUND);
        }
        const rolesEntities: RoleEntity[] = [];
        for (const roleName of roles) {
            const role = await this.roleRepository.findOne({where: {role_name: roleName}});
            if (!role) {
                throw new BussinessLogicException(`roles inválidos`, BussinessError.BAD_REQUEST);
            }
            if (user.roles.find(r => r.role_name === role.role_name)) {
                continue;
            }
            rolesEntities.push(role);
        }
        if (rolesEntities.length === 0) {
            throw new BussinessLogicException('Todos los roles ya están asignados al usuario', BussinessError.CONFLICT);
        }
        user.roles = [...user.roles, ...rolesEntities];
        await this.userRepository.save(user);
        return {message: 'Roles asignados correctamente'};
    }
}

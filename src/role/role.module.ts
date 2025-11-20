/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';

@Module({
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService]
})
export class RoleModule {}

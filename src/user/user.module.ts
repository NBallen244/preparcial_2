import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../role/role.entity';
import { UserEntity } from './user.entity';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

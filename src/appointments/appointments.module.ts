/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsEntity } from './appointments.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { UserEntity } from 'src/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AppointmentsEntity, UserEntity])],
    providers: [AppointmentsService],
    controllers: [AppointmentsController]
})
export class AppointmentsModule {}

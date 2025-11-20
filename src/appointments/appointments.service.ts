/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsEntity, AppointmentStatus } from './appointments.entity';
import { Repository } from 'typeorm';
import { AppointmentDto } from './appointment.dto';
import { BussinessError, BussinessLogicException } from 'src/shared/errors/bussiness-errors';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(AppointmentsEntity)
        private readonly appointmentsRepository: Repository<AppointmentsEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createAppointment(appointment: AppointmentDto, userId: string, doctorId: string): Promise<AppointmentsEntity> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new BussinessLogicException("Usuario no encontrado", BussinessError.NOT_FOUND);
        }
        const doctor = await this.userRepository.findOne({ where: { id: doctorId }, relations: ['roles'] });
        if (!doctor) {
            throw new BussinessLogicException("Doctor no encontrado", BussinessError.NOT_FOUND);
        }
        const rolesDoctor = doctor.roles;
        const roles_names_doctor = rolesDoctor.map(role => role.role_name);
        if (!roles_names_doctor.includes('doctor')) {
            throw new BussinessLogicException("El usuario doctor no es un doctor", BussinessError.BAD_REQUEST);
        }
        const newAppointment = new AppointmentsEntity();
        newAppointment.user = user;
        newAppointment.doctor = doctor;
        newAppointment.datetime = appointment.datetime;
        newAppointment.motive = appointment.motive;
        return await this.appointmentsRepository.save(newAppointment);
    }

    async getAppointmentsByUser(userId: string): Promise<AppointmentsEntity[]> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
        if (!user) {
            throw new BussinessLogicException("Usuario no encontrado", BussinessError.NOT_FOUND);
        }
        const roles = user.roles;
        const roles_names = roles.map(role => role.role_name);
        if (roles_names.includes('admin')) {
            return await this.appointmentsRepository.find({ relations: ['user', 'doctor'] });
        }
        if (roles_names.includes('doctor')) {
            return await this.appointmentsRepository.find({ where: { doctor: { id: userId } }, relations: ['user', 'doctor'] });
        }
        if (roles_names.includes('paciente')) {
            return await this.appointmentsRepository.find({ where: { user: { id: userId } }, relations: ['user', 'doctor'] });
        }
        else{
            throw new BussinessLogicException("Rol erroneo", BussinessError.UNAUTHORIZED);
        }
    }

    async deleteAppointment(appointmentId: string, userId:string): Promise<void> {
        const appointment = await this.appointmentsRepository.findOneBy({ id: appointmentId });
        if (!appointment) {
            throw new BussinessLogicException("Cita no encontrada", BussinessError.NOT_FOUND);
        }
        const user= await this.userRepository.findOneBy({id: userId});
        if (!user) {
            throw new BussinessLogicException("Usuario no encontrado", BussinessError.NOT_FOUND);
        }
        if(appointment.user.id !== user.id){
            throw new BussinessLogicException("Cita no perteneciente a este usuario", BussinessError.BAD_REQUEST);
        }
        await this.appointmentsRepository.remove(appointment);
    }

    async updateAppointMentStatus(appointmentId: string, {status}: {status: AppointmentStatus}): Promise<void> {
        const appointment = await this.appointmentsRepository.findOneBy({ id: appointmentId });
        if (appointment) {
            const statusActual = appointment.status;
            if(statusActual === AppointmentStatus.PENDING && status !== AppointmentStatus.PENDING){
                appointment.status = status;
                await this.appointmentsRepository.save(appointment);
            }
            else{
                throw new BussinessLogicException("Cambio inválido", BussinessError.PRECONDITION_FAILED);
            }
        }else{
            throw new BussinessLogicException("Cita no encontrada", BussinessError.NOT_FOUND);
        }
    }
}

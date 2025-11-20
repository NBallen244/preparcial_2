/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards, Request, Put, Param, Body, Delete, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from '../role/role.decorator';
import { RoleGuard } from '../role/role.guard';
import { AppointmentStatus } from './appointments.entity';
import { AppointmentDto } from './appointment.dto';

@Controller('citas')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCitas(@Request() req) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return await this.appointmentsService.getAppointmentsByUser(req.user.userId as string);
    }

    @Roles('doctor')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put(':id')
    async updateAppointmentStatus(@Param('id') id: string, @Body() body: {status: AppointmentStatus}) {
        return await this.appointmentsService.updateAppointMentStatus(id, body);
    }

    @Delete(':id')
    @Roles('paciente')
    @UseGuards(JwtAuthGuard, RoleGuard)
    async deleteAppointment(@Param('id') id: string, @Request() req) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return await this.appointmentsService.deleteAppointment(id, req.user.userId as string);
    }

    @Post(':id')
    @Roles('paciente')
    @UseGuards(JwtAuthGuard, RoleGuard)
    async createAppointment(@Param('id') doctor_id: string, @Body() body:AppointmentDto, @Request() req) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return await this.appointmentsService.createAppointment(body, req.user.userId as string, doctor_id);
    }
}

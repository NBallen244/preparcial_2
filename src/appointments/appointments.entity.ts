/* eslint-disable prettier/prettier */
import { UserEntity } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
export enum AppointmentStatus {
    PENDING = 'pending',
    DONE = 'done',
    CANCELLED = 'canceled',
}
/* eslint-disable prettier/prettier */
@Entity()
export class AppointmentsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({nullable: false})
    datetime:Date;
    @Column({nullable: false, default: AppointmentStatus.PENDING})
    status:AppointmentStatus;
    @Column({nullable: false})
    motive:string;
    @CreateDateColumn()
    created_at: Date;
    @ManyToOne(() => UserEntity, user => user.appointments)
    user: UserEntity;
    @ManyToOne(() => UserEntity, doctor => doctor.doctorAppointments)
    doctor: UserEntity;
}

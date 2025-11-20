/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { RoleEntity } from "../role/role.entity";
import { AppointmentsEntity } from "../appointments/appointments.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({nullable: false})
    email: string;
    @Column({nullable: false})
    password: string;
    @Column()
    name: string;
    @Column({nullable: true, type: 'bigint'})
    phone: number;
    @Column({default: true})
    is_active: boolean;
    @CreateDateColumn()
    created_at: Date;
    @ManyToMany(() => RoleEntity, role => role.users)
    @JoinTable()
    roles: RoleEntity[];
    @OneToMany(() => AppointmentsEntity, appointment => appointment.user)
    appointments: AppointmentsEntity[];
    @OneToMany(() => AppointmentsEntity, appointment => appointment.doctor)
    doctorAppointments: AppointmentsEntity[];

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            this.password = await bcrypt.hash(this.password, 10);
        }   
    }
}

/* eslint-disable prettier/prettier */
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { RoleEntity } from "../role/role.entity";

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
    @Column({nullable: true})
    phone: number;
    @Column({default: true})
    is_active: boolean;
    @CreateDateColumn()
    created_at: Date;
    @ManyToMany(() => RoleEntity, role => role.users)
    @JoinTable()
    roles: RoleEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            this.password = await bcrypt.hash(this.password, 10);
        }   
    }
}

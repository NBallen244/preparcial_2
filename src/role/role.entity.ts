/* eslint-disable prettier/prettier */
import { UserEntity } from "../user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({nullable: false, unique: true})
    role_name: string;
    @Column({nullable: true})
    description: string;
    @CreateDateColumn()
    created_at: Date;
    @ManyToMany(() => UserEntity, user => user.roles)
    users: UserEntity[];
}

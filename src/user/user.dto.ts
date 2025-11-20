/* eslint-disable prettier/prettier */
import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { Exclude } from 'class-transformer';
export class UserDto {


 @IsEmail()
 @IsNotEmpty()
 readonly email: string;
 
 @IsString()
 @IsNotEmpty()
 @Exclude({ toPlainOnly: true })
 readonly password: string;
 
 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsNumber()
 @IsOptional()
 readonly phone: number;
 
 @IsBoolean()
 @IsNotEmpty()
 readonly is_active: boolean;


}
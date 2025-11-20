/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString} from 'class-validator';
export class RoleDto {


 @IsString()
 @IsNotEmpty()
 readonly role_name: string;
 
 @IsString()
 @IsNotEmpty()
 readonly description: string;

}
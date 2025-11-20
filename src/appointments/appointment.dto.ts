/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString} from 'class-validator';

export class AppointmentDto {
    @IsString()
    @IsNotEmpty()
    readonly motive: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    readonly datetime: Date;
}
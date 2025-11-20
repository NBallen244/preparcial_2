/* eslint-disable prettier/prettier */
import { Body, Controller, DefaultValuePipe, HttpCode, HttpStatus, ParseArrayPipe, Post, Query, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';
import { UserEntity } from '../user/user.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@UseInterceptors(BusinessErrorsInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService, 
        private readonly userService: UserService
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async registerUser(@Body() userData: UserDto, @Query('roles', new DefaultValuePipe([]), ParseArrayPipe) roles: string[]) {
        const user:UserEntity= plainToInstance(UserEntity, userData);
        return await this.userService.registerUser(user, roles);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginUser(@Request() req) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        return await this.authService.login(req.user);
    }
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Dependencies, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username:string, password:string) {
    const user:UserEntity|null = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException("Credenciales Invalidas", HttpStatus.UNAUTHORIZED);
    }
    else if (!(user.is_active)) {
      throw new HttpException("Usuario desactivado", HttpStatus.LOCKED);
    }
    return user;
  }
}

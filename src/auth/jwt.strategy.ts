/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const user = await this.userService.getUserByEmail(payload.username);
    if (!user) {
      throw new HttpException('Token inválido o faltante', HttpStatus.UNAUTHORIZED);
    }
    if (!user.is_active) {
      throw new HttpException('Usuario inactivo', HttpStatus.LOCKED);
    }

    const userData = {
      userId: user.id,
      username: user.email,
      roles: user.roles.map(role => role.role_name),
    };
    
    return userData;
  }
}

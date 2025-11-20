/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleRequest(err, user, info: Error) {
    if (err || !user) {
      throw new HttpException('Token inválido o faltante', HttpStatus.UNAUTHORIZED);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
}

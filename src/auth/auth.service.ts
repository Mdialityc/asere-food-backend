import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userReq: LoginDTO) {
    const user = await this.usersService.findByEmail(userReq.email);

    if (user && userReq.password === user.password) {
      const payload = { sub: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return new UnauthorizedException();
    }
  }
}

import { BadRequestException, ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import PgService from '../../database/services/pg.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../decorators/roles.decorator';
import RegisterIn from '../dto/in/register.in.dto';
import RegisterInDto from '../dto/in/register.in.dto';

@Injectable()
export default class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly pgService: PgService,
  ) {}

  async login(username: string, password: string) {
    const adminUsername = this.configService.get<string>(
      'SUPER_ADMIN_USERNAME',
    );
    const adminPassword = this.configService.get<string>(
      'SUPER_ADMIN_PASSWORD',
    );

    let payload;
    let userId: number;

    if (username === adminUsername && password === adminPassword) {
      payload = { username, role: Role.SuperAdmin };
      userId = -1;
    } else {
      const user = await this.pgService.users.findOne({
        where: { username },
      });

      if (!user || !(await user.validatePassword(password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      payload = {
        username: user.username,
        email: user.email,
        name: user.name,
        userId: user.id,
        role: user.role,
      };

      userId = user.id;
    }



    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { expiresIn: '30d' },
    );

    const rt = await this.pgService.refreshTokens.findOne({
      where: { userId: userId },
    });

    if (!rt) {
      const newRT = this.pgService.refreshTokens.create({
        userId: userId,
        refreshToken: refreshToken,
      });

      await this.pgService.refreshTokens.save(newRT);
      this.logger.log(`Created new refresh token for User ${userId}`);
    } else {
      await this.pgService.refreshTokens.update(rt.id, {
        refreshToken: refreshToken,
      });
    }

    this.logger.log(`Authenticated User ${userId}`);

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const userId = payload.sub;

      const rt = await this.pgService.refreshTokens.findOne({
        where: { userId },
      });

      if (!rt) {
        throw new Error();
      }

      const newAccessToken = this.jwtService.sign({ userId });
      const newRefreshToken = this.jwtService.sign(
        { sub: userId },
        { expiresIn: '30d' },
      );

      await this.pgService.refreshTokens.update(rt.id, {
        refreshToken: newRefreshToken,
      });

      this.logger.log(`Refresh Token for User ${userId}`);

      return { newAccessToken, newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.pgService.users.findOne({
      where: { id: userId },
    });
    if (!user || !(await user.validatePassword(oldPassword))) {
      throw new BadRequestException('Invalid credentials');
    }

    user.password = newPassword;

    await this.pgService.users.save(user)

    this.logger.log(`Updated user Password with ID ${user.id}`);
  }
}

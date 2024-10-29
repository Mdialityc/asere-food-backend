import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './piblic.decorator';

export class LoginDTO {
  @ApiProperty({ default: 'jesus.reikel@gmail.com' })
  email: string;

  @ApiProperty({ default: '12345678' })
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOkResponse({ description: 'Login success' })
  @ApiForbiddenResponse({ description: 'Invalid credences ' })
  @Post('login')
  async login(@Body() req: LoginDTO) {
    return this.authService.login(req);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google.guard';
import { AuthService } from './services/auth.service';
import { Req } from '@nestjs/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UseGuards(GoogleAuthGuard)
  handleLogin(@Req() request) {
    const session = this.authService.generateJwt(request.user);
    return session;
  }

  @Get('callback/google')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin(@Req() request) {
    const session = this.authService.generateJwt(request.user);
    return session;
  }
}

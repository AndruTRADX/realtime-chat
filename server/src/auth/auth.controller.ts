import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard, JwtAuthGuard)
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    const { user } = req;
    const token = await this.authService.signIn(user);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    });

    return res.status(HttpStatus.OK).end();
  }
}

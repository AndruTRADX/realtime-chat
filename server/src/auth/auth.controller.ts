import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./guards/google.guard";

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication'}
  }

  @Get('callback/google')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'Ok'}
  }
}
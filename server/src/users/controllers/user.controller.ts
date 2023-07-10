import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core';
import { AuthGuard } from '@nestjs/passport';
import { Get, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserLogged(@Req() request) {
    const accessToken = request.headers.authorization;
    const user = this.userService.getUserByToken(accessToken);
    return user;
  }
}

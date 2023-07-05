import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { Model } from 'mongoose';
import { google } from 'googleapis';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user: User) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser();
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser() {
    const client = new google.auth.OAuth2();
    const googleAuth = google.oauth2('v2');
    const { data } = await googleAuth.userinfo.get({ auth: client });

    try {
      const createUserDto: CreateUserDto = {
        username: data.name,
        email: data.email,
        avatarURL: data.picture,
        googleId: data.id,
      };

      const newUser = new this.userModel(createUserDto);
      await newUser.save();

      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}

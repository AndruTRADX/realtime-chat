import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import { ConfigType } from '@nestjs/config';
import config from '../../config/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configiService: ConfigType<typeof config>,
  ) {}

  async createUserWithGoogleAuth(token: string): Promise<string> {
    const client = new google.auth.OAuth2();
    const googleAuth = google.oauth2('v2');
    client.setCredentials({ access_token: token });
    const { data } = await googleAuth.userinfo.get({ auth: client });

    const existingUser = await this.userModel.findOne({ email: data.email });

    if (existingUser) {
      const jwtToken = this.generateJwt(existingUser);
      return jwtToken;
    }

    const createUserDto: CreateUserDto = {
      username: data.name,
      email: data.email,
      avatarURL: data.picture,
      googleId: data.id,
    };

    const newUser = new this.userModel(createUserDto);
    await newUser.save();

    const jwtToken = this.generateJwt(newUser);
    return jwtToken;
  }

  private generateJwt(user: User): string {
    const jwtPayload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    const jwtToken = jwt.sign(jwtPayload, this.configiService.jwt.secret, {
      expiresIn: '1h',
    });
    return jwtToken;
  }
}

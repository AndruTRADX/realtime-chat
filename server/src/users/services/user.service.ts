import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async getUserByToken(rawAccessToken: string) {
    const accessToken = rawAccessToken.replace('Bearer ', '');
    const decodedToken = this.jwtService.verify(accessToken);
    const userId = decodedToken.sub;

    const user = await this.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async addContacts(userId: string, contactId: string) {
    await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { contacts: contactId } },
      { new: true },
    );
  }
}

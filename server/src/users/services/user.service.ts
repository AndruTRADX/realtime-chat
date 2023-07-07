import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
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

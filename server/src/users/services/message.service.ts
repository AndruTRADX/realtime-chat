import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../entities/message.entity';
import { Model } from 'mongoose';
import { UserService } from './user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private readonly userService: UserService,
  ) {}

  async createMessage(rawAccessToken: string, content: string) {
    const user = await this.userService.getUserByToken(rawAccessToken);
    const message = new this.messageModel({ sender: user._id, content });
    const newMessage = await message.save();
    return newMessage;
  }
}

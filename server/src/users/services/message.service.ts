import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../entities/message.entity';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createMessage(user: User, content: string) {
    const message = new this.messageModel({ sender: user._id, content });
    const newMessage = await message.save();
    return newMessage;
  }
}

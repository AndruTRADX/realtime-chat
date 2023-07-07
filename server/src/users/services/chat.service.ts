import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from '../entities/chat.entity';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async createChat(users: User[]): Promise<Chat> {
    const chat: Chat = new this.chatModel({
      participants: users
    });

    const newChat = await chat.save();
    return newChat;
  }
}

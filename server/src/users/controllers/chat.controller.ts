import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { ChatService } from '../services/chat.service';
import { request } from 'http';

@UseGuards(AuthGuard('jwt'))
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':id')
  async getChatById(@Param('id', MongoIdPipe) id: string) {
    const chat = this.chatService.getChatById(id);
    return chat;
  }
}

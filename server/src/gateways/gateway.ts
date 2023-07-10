import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected', socket.id);
    })
  }

  @SubscribeMessage('new_message')
  onNewMessage(@MessageBody() body: any) {
    this.server.emit('on_message', {
      msg: 'New Message',
      content: body
    })
  }
}

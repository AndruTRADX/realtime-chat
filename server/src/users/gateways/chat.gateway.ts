import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat.service';
import { MessageService } from '../services/message.service';

@WebSocketGateway(81, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private messageService: MessageService,
  ) {}

  @WebSocketServer() server: Server;

  afterInit() {
    console.log('Inicia el gateway');
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log('Alguien se conectó al socket', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Alguien se desconectó del socket', client.id);
  }

  @SubscribeMessage('event_message')
  async onNewMessage(
    client: Socket,
    payload: { content: string; chatId: string },
  ) {
    const { content, chatId } = payload;
    const accessToken = client.handshake.headers.authorization;

    // obtengo el usuario
    const user = await this.userService.getUserByToken(accessToken);

    // creo el mensaje
    const message = await this.messageService.createMessage(user, content);

    // añado el mensaje al chat
    await this.chatService.addMessage(chatId, message);
    
    // emito el mensaje
    this.server.emit('new_message', message);
  }
}

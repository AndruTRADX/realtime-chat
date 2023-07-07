import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Contact, ContactSchema } from './entities/contact.entity';
import { Chat, ChatSchema } from './entities/chat.entity';
import { Message, MessageSchema } from './entities/message.entity';
import { ContactService } from './services/contact.service';
import { UserService } from './services/user.service';
import { ContactController } from './controllers/contact.controller';
import { ChatService } from './services/chat.service';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Contact.name, schema: ContactSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: async (configiService: ConfigType<typeof config>) => {
        return {
          secret: configiService.jwt.secret,
          signOptions: {
            expiresIn: '3h',
          },
        };
      },
    }),
  ],
  exports: [],
  providers: [ContactService, UserService, ChatService],
  controllers: [ContactController],
})
export class UsersModule {}

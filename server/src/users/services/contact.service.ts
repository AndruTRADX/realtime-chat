import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from '../entities/contact.entity';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { ChatService } from './chat.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
    private readonly jwtService: JwtService,
    private userService: UserService,
    private chatService: ChatService,
  ) {}

  async createContact(accessToken: string, email: string) {
    const decodedToken = this.jwtService.verify(accessToken);
    const userId = decodedToken.sub;

    const user = await this.userService.findUserById(userId);
    const contactUser = await this.userService.findUserByEmail(email);
    const chat = await this.chatService.createChat([user, contactUser]);

    await this.userService.addContacts(user._id, contactUser._id);
    await this.userService.addContacts(contactUser._id, user._id);

    const contact = new this.contactModel({
      contact: contactUser._id,
      chat: chat._id,
    });

    const createdContact = await contact.save();
    return createdContact;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from '../entities/contact.entity';
import { UserService } from './user.service';
import { ChatService } from './chat.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
    private userService: UserService,
    private chatService: ChatService,
  ) {}

  async createContact(rawAccessToken: string, email: string) {
    const user = await this.userService.getUserByToken(rawAccessToken);
    const contact = await this.userService.findUserByEmail(email);
    const currentContacts = await this.getContactsByIds(user.contacts);

    const contactExist = currentContacts.find((currentContact) => {
      const a = currentContact.contact[0].toString();
      const b = contact._id.toString();
      return a === b;
    });

    if (contactExist) return { message: 'Contact already exist.' };

    const chat = await this.chatService.createChat([user, contact]);

    const contactUser = new this.contactModel({
      contact: contact._id,
      chat: chat._id,
    });
    const contactContact = new this.contactModel({
      contact: user._id,
      chat: chat._id,
    });

    const createdContactUser = await contactUser.save();
    const createdContactContact = await contactContact.save();

    await this.userService.addContacts(user._id, createdContactUser._id);
    await this.userService.addContacts(contact._id, createdContactContact._id);

    return createdContactUser.populate('contact');
  }

  async getContactsByIds(contactIds: Contact[]): Promise<Contact[]> {
    const contacts = await this.contactModel
      .find({ _id: { $in: contactIds } })
      .exec();
    return contacts;
  }

  async getUserContacts(rawAccessToken: string) {
    const user = await this.userService.getUserByToken(rawAccessToken);
    const contactIds = user.contacts;
    const contacts = await this.getContactsByIds(contactIds);

    return contacts;
  }
}

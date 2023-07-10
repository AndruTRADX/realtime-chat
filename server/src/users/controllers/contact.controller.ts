import { Controller, Get, UseGuards } from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { Post, Body, Req } from '@nestjs/common';
import { CreateContactDto } from '../dtos/contact.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async get(@Req() request) {
    const accessToken = request.headers.authorization;
    const userContacs = await this.contactService.getUserContacts(accessToken);
    return userContacs;
  }

  @Post()
  async create(@Req() request, @Body() createContactDto: CreateContactDto) {
    const accessToken = request.headers.authorization;
    const newContact = await this.contactService.createContact(
      accessToken,
      createContactDto.email,
    );

    return newContact;
  }
}

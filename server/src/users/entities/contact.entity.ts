import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.entity';
import { Chat } from './chat.entity';

@Schema()
export class Contact extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  contact: User | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Chat' }] })
  chat: Chat | Types.ObjectId;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Contact } from './contact.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  avatarURL: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Contact.name }] })
  contacts: Contact[];
}

export const UserSchema = SchemaFactory.createForClass(User);

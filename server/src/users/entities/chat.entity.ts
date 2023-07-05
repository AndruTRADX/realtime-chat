import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message, MessageSchema } from './message.entity';
import { User } from './user.entity';

@Schema()
export class Chat extends Document {
  @Prop({ type: [{ type: MessageSchema, default: [] }] })
  messages: Message[];

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  participants: User[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

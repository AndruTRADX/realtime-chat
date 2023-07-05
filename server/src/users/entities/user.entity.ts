import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  avatarURL: string;

  @Prop({ unique: true })
  googleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ enum: ['Tenant', 'Staff', 'Admin'], default: 'Tenant' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

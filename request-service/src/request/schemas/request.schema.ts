import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema()
export class Request {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RequestSchema = SchemaFactory.createForClass(Request);

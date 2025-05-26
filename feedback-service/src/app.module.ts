import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackModule } from './feedback/feedback.module';
import * as dotenv from 'dotenv';

dotenv.config(); 

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('❌ MONGO_URI is not defined in .env file');
}

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    FeedbackModule,
  ],
})
export class AppModule {}

// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 4000;
  await app.listen(port);
  Logger.log(`Assignment Service running on port ${port}`);
}
bootstrap();

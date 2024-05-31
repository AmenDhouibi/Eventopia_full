import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


const mongoose = require('mongoose');

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
mongoose.connect('mongodb+srv://amine101yahya:GcRhxvg4btkFT0Dl@eventopia.9uxsykr.mongodb.net/?retryWrites=true&w=majority&appName=Eventopia')


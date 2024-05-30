import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const mongoose = require('mongoose');

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(3000);
}
bootstrap();
mongoose.connect('mongodb+srv://amine101yahya:GcRhxvg4btkFT0Dl@eventopia.9uxsykr.mongodb.net/?retryWrites=true&w=majority&appName=Eventopia')


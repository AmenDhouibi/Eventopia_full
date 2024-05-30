import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightModule } from './flight/flight.module';
import { UserModule } from './user/user.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://amine101yahya:GcRhxvg4btkFT0Dl@eventopia.9uxsykr.mongodb.net/?retryWrites=true&w=majority&appName=Eventopia'),
    AuthModule,
    EventModule,
    FlightModule,
    UserModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


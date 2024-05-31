import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModel } from './event.model';
import { EventRepository } from './event.repository';
import { UserModule } from 'src/user/user.module';
import { EventRoleModel } from './eventrole.model';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [
    MailingModule,
    UserModule,
    AuthModule,
    MongooseModule.forFeature([{ name: 'Event', schema: EventModel.schema }]),
    MongooseModule.forFeature([{ name: 'EventRole', schema: EventRoleModel.schema }]),
  ],
  providers: [EventService, EventRepository], // Include EventRepository as a provider
  controllers: [EventController], // Remove EventRepository from controllers
})
export class EventModule {}

import { forwardRef, Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModel } from './event.model';
import { EventRepository } from './event.repository';
import { UserModule } from 'src/user/user.module';
import { EventRoleModel } from './eventrole.model';
import { MailingModule } from 'src/mailing/mailing.module';
import { GuestModel } from 'src/guest/guest.model'; 
import { StaffModel } from 'src/staff/staff.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventModel.schema }]),
    MongooseModule.forFeature([{ name: 'EventRole', schema: EventRoleModel.schema }]),
    MongooseModule.forFeature([{ name: 'Guest', schema: GuestModel.schema }]),
    MongooseModule.forFeature([{ name: 'Staff', schema: StaffModel.schema }]),
    MailingModule,
    UserModule,
    AuthModule,
  ],
  providers: [EventService, EventRepository], // Include EventRepository as a provider
  controllers: [EventController], 
  exports : [EventRepository,EventService]
})
export class EventModule {}

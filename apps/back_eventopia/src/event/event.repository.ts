import { Inject, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create.dto';
import { IUser } from 'src/user/user.model';
import { IEvent } from './event.model';
import { AuthGuard } from '@nestjs/passport';
import { eventfilterdto } from './dto/event.filter.dto';
import { IEventRole } from './eventrole.model';
import { IStaff } from 'src/staff/staff.model';
import { IGuest } from 'src/guest/guest.model';


@Injectable()
@UseGuards(AuthGuard())
export class EventRepository {

  constructor(
    @InjectModel('Event') private readonly eventModel: Model<IEvent>,
    @InjectModel('EventRole') private readonly eventRoleModel: Model<IEventRole>,
    ) {}

  async findAll(): Promise<IEvent[]> {
    const events = await this.eventModel.find().exec();
    if (!events.length) {
      throw new NotFoundException(`No events found`);
    }
    return events;
  }

  async findEvent(filterDto: eventfilterdto): Promise<IEvent[] | null> {
    try {
      const { eventId, eventName, eventDate, eventLocation, user } = filterDto;

      const query: any = {};

      if (eventId) {
        query._id = eventId;
      }

      if (eventName) {
        query.name = eventName;
      }

      if (eventDate) {
        query.date = eventDate;
      }

      if (eventLocation) {
        query.location = eventLocation;
      }

      if (user) {
        query.event_manager = user;
      }

      return await this.eventModel.find(query).exec();
    } catch (error) {
      throw error;
    }
  }

  findById(eventId: string): Promise<IEvent> {
    return this.eventModel.findOne({ _id: eventId}).exec();
  }
  

  async create(createEventDto: CreateEventDto, user :IUser): Promise<IEvent> {
    const createdEvent = new this.eventModel({ ...createEventDto, event_manager: user }); 
    await createdEvent.save();
    await this.createEventRole(createdEvent._id, user._id, 'manager');

    return createdEvent;
  }

  async updateevent(eventId: string, updateEventDto: any): Promise<IEvent> {
    const event = await this.eventModel.findById(eventId);
    if (!event){
      throw new NotFoundException('Event with ID ${eventId} not found')
    }
    if (updateEventDto.name) {
      event.name = updateEventDto.name;
    }
    if (updateEventDto.place) {
      event.place = updateEventDto.place;
    }
    if (updateEventDto.time) {
      event.time = updateEventDto.time;
    }
    if (updateEventDto.description) {
      event.description = updateEventDto.description;
    }
    if (updateEventDto.poster) {
      event.poster = updateEventDto.poster;
    }
    if (updateEventDto.numberOfAttendees) {
      event.numberOfAttendees = updateEventDto.numberOfAttendees;
    }
    if (updateEventDto.sponsors) {
      event.sponsors = updateEventDto.sponsors;
    }
    if (updateEventDto.organizingClub) {
      event.organizingClub = updateEventDto.organizingClub;
    }
    return event.save();
  }

  async delete(eventId: string, user: IUser): Promise<void> {
    const result = await this.eventModel.deleteOne({ _id: eventId, event_manager: user }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
  }

  async  findallstaff(eventId: string): Promise<IStaff[]> {
    const event = await this.eventModel.findOne({ _id: eventId }).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    return event.staff;
  }

  async findallguests(eventId: string): Promise<IGuest[]> {
    const event = await this.eventModel.findOne({ _id: eventId }).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    return event.guests;
  }

  async removeGuest(eventId: string, userId: string): Promise<void> {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    const index = event.guests.findIndex(guestId => guestId.toString() === userId);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${userId} is not a guest of the event`);
    }
    event.guests.splice(index, 1);
    await event.save();
  }

  async removeStaff(eventId: string, userId: string): Promise<void> {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    const index = event.staff.findIndex(staffId => staffId.toString() === userId);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${userId} is not a staff of the event`);
    }
    event.staff.splice(index, 1);
    await event.save();
  }

  private async createEventRole(eventId: string, userId: string, role: string): Promise<IEventRole> {
    const eventRole = new this.eventRoleModel({ event: eventId, user: userId, role });
    return await eventRole.save();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './dto/create.dto';
import { IUser } from 'src/user/user.model';
import { IEvent } from './event.model';
import { eventfilterdto } from './dto/event.filter.dto';
import { UserService } from 'src/user/user.service';
import { UpdateEventDto } from './dto/update.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly userService: UserService
    ) {}

  async findAll(): Promise<IEvent[]> {
    return this.eventRepository.findAll();
  }

  async findById(eventId: string): Promise<IEvent> {
    const event = this.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    return event;
  }

  async findEvent(filterDto: eventfilterdto): Promise<IEvent[] | null> {
    try {
      return await this.eventRepository.findEvent(filterDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async create(createEventDto: CreateEventDto, eventManager: IUser): Promise<IEvent> {
    return this.eventRepository.create(createEventDto, eventManager);
  }

  async findallguests(eventId: string): Promise<IUser[]> {
    return this.eventRepository.findallguests(eventId);
  }

  async findallstaff(eventId: string): Promise<IUser[]> {
    return this.eventRepository.findallstaff(eventId);
  }

  async delete(eventId: string, user: IUser): Promise<void> {
    return this.eventRepository.delete(eventId, user);
  }

  async UpdateEvent(eventId: string , UpdateEventDto: UpdateEventDto) : Promise<IEvent> {
    return this.eventRepository.updateevent(eventId,UpdateEventDto);
  }

  async removeGuest(eventId: string, userId: string): Promise<void> {
    // Call the corresponding method from the repository
    await this.eventRepository.removeGuest(eventId, userId);
  }

  async removeStaff(eventId: string, userId: string): Promise<void> {
    // Call the corresponding method from the repository
    await this.eventRepository.removeStaff(eventId, userId);
  }
}

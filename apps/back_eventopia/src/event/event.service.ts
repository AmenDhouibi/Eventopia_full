import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './dto/create.dto';
import { IUser } from 'src/user/user.model';
import { IEvent } from './event.model';
import { eventfilterdto } from './dto/event.filter.dto';
import { UpdateEventDto } from './dto/update.dto';
import { IStaff } from 'src/staff/staff.model';
import { IGuest } from 'src/guest/guest.model';
import { FlightService } from '../flight/flight.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly FlightService : FlightService,
    private readonly userService: UserService, // Inject the UserService


    ) {}

    async finddriverbyid(driverId: string): Promise<IStaff> {
      return this.eventRepository.finddriverbyid(driverId);
    }

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
    const event = await this.eventRepository.create(createEventDto, eventManager);
    await this.userService.addEventToUser(eventManager._id, event._id);
    return event;
  }

  async findallguests(eventId: string): Promise<IGuest[]> {
    return this.eventRepository.findallguests(eventId);
  }

  async findallstaff(eventId: string): Promise<IStaff[]> {
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

  async addguest(eventId: string, guestId: IGuest): Promise<boolean> {
    return this.eventRepository.addguest(eventId, guestId);
  }
  async addstaff(eventId: string, staffId: IStaff): Promise<boolean> {
    return this.eventRepository.addstaff(eventId, staffId);
  }

  async findguestbyid(guestId: string): Promise<IGuest> {
    return this.eventRepository.findguestbyid(guestId);
  }

  async assignDriverToGuest(eventId: string, guestId: string, driverId: string): Promise<boolean> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    const driver = event.staff.find(staff => staff.toString() === driverId);
    if (!driver) {
      throw new NotFoundException(`User with ID ${driverId} is not a staff of the event`);
    }
    const guest = event.guests.find(guest => guest.toString() === guestId);
    if (!guest) {
      throw new NotFoundException(`User with ID ${guestId} is not a guest of the event`);
    }
    await this.eventRepository.updateGuestWithDriver(guestId, driverId);
    await this.eventRepository.updateDriverWithGuest(driverId, guestId);

    const flight_id = this.eventRepository.getGuestFlight_number(guestId);

    this.FlightService.fetchFlightInformation(await flight_id);
    

    // a controller

    const email = guest.user.haha;

    return true;
  }
}

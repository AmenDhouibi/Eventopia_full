import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards, Query, NotFoundException, Patch } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create.dto';
import { IUser } from 'src/user/user.model';
import { IEvent } from './event.model';
import { GetUser } from 'src/user/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { eventfilterdto } from './dto/event.filter.dto';
import { UserService } from 'src/user/user.service';
import { UpdateEventDto } from './dto/update.dto';
import { MailingService } from '../mailing/mailing.service';

@Controller('events')
@UseGuards(AuthGuard())
export class EventController {
  constructor(
    private readonly userservice : UserService,
    private readonly eventService: EventService,
    private readonly MailingService : MailingService,
    ) {}

  @Get()
  async findEvent(@Query() filterDto: eventfilterdto): Promise<IEvent[]> {
    try {
      return await this.eventService.findEvent(filterDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('/:id')
  async findById(@Param('id') eventId: string, @GetUser() user: IUser): Promise<IEvent> {
    return this.eventService.findById(eventId);
  }

  @Post()
  async create(@Body() createEventDto: CreateEventDto, @GetUser() user: IUser): Promise<IEvent> {
    const event = this.eventService.create(createEventDto, user);
    return event;
  }

  @Delete('/:id')
  async delete(@Param('id') eventId: string, @GetUser() user: IUser): Promise<void> {
    const event = await this.eventService.findById(eventId);
    if (user.id !== event.event_manager.id.toString('hex')) {
    throw new Error('You are not authorized to delete this event');
    }
    return this.eventService.delete(eventId, user);
  }

  @Get('/:id/staff')
  async findallstaff(@Param('id') eventId: string,@GetUser() user: IUser): Promise<IUser[]> {
  const event = await this.eventService.findById(eventId);
    if (user.id !== event.event_manager.id) {
    return this.eventService.findallstaff(eventId);
  }
  else{
    throw new Error('You are not authorized to view this page');
  }
  
  
  }

  @Get('/:id/guests')
  async findallguests(@Param('id') eventId: string,@GetUser() user: IUser): Promise<IUser[]> {
    const event = await this.eventService.findById(eventId);
    if (user.id !== event.event_manager.id) {
    return this.eventService.findallguests(eventId);
  }
  else{
    throw new Error('You are not authorized to view this page');
  }
  }

  @Patch('/:id')
  async updateEvent(
    @Param('id') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
    @GetUser() user : IUser,
  ): Promise<IEvent> {
    return await this.eventService.UpdateEvent(eventId, updateEventDto);
  }

  @Delete('/:eventId/guests/:userId')
  async removeGuestFromEvent(
  @Param('eventId') eventId: string,
  @Param('userId') userId: string,
  @GetUser()user : IUser
) {
    try {
      const event = await this.eventService.findById(eventId);
      if (user.id !== event.event_manager.id.toString('hex')){
      throw new Error('You are not authorized to delete this event');
      }
      await this.eventService.removeGuest(eventId, userId);
      return { message: 'Guest removed from event successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete('/:eventId/staff/:userId')
  async removeStaffFromEvent(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string,
    @GetUser()user : IUser) {
    try {
      const event = await this.eventService.findById(eventId);
      if (user.id !== event.event_manager.id.toString('hex')){
      throw new Error('You are not authorized to delete this event');
      }
      await this.eventService.removeStaff(eventId, userId);
      return { message: 'Staff removed from event successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }


  // INivite methods 
  
  @Post('invite/guests/:id')
  async inviteGuests(
      @Body('emails') emails: string | string[],
      @Param('id') id: string,
  ) {
      try {
          // Fetch event details
          const event = await this.eventService.findById(id);
          if (!event) {
              throw new NotFoundException('Event not found');
          }

          // Construct invite link
          const inviteLink = `http://localhost:5000/${id}/inviteguests`;

          // Send invitation email
          await this.MailingService.sendInvitationEmail(emails, event.name, inviteLink);

          return { message: 'Guest invitations sent successfully' };
      } catch (error) {
          console.error('Error sending guest invitations:', error);
          return { message: 'Failed to send guest invitations', error };
      }
  }

  @Post('invite/staff/:id')
  async inviteStaff(
      @Body('emails') emails: string[],
      @Param('id') id: string,
  ) {
      try {
          // Fetch event details
          const event = await this.eventService.findById(id);
          if (!event) {
              throw new NotFoundException('Event not found');
          }

          // Construct invite link
          const inviteLink = `http://localhost:5000/${id}/invitestaff`;

          // Send invitation email
          await this.MailingService.sendInvitationEmail(emails, event.name, inviteLink);

          return { message: 'Staff invitations sent successfully' };
      } catch (error) {
          console.error('Error sending staff invitations:', error);
          return { message: 'Failed to send staff invitations', error };
      }
  }
}

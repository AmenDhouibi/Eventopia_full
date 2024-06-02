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
import { IStaff } from 'src/staff/staff.model';
import { IGuest } from 'src/guest/guest.model';
import { eventNames } from 'process';

@Controller('events')
export class EventController {
  constructor(
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
  @UseGuards(AuthGuard())
  async create(@Body() createEventDto: CreateEventDto, @GetUser() user: IUser): Promise<IEvent> {
    const event = this.eventService.create(createEventDto, user);
    return event;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async delete(@Param('id') eventId: string, @GetUser() user: IUser): Promise<void> {
    const event = await this.eventService.findById(eventId);
    if (user.id !== event.event_manager.id.toString('hex')) {
    throw new Error('You are not authorized to delete this event');
    }
    return this.eventService.delete(eventId, user);
  }

  @Get('/:id/staff')
  @UseGuards(AuthGuard())
  async findallstaff(@Param('id') eventId: string,@GetUser() user: IUser): Promise<IStaff[]> {
  const event = await this.eventService.findById(eventId);
    if (user.id !== event.event_manager.id) {
    return this.eventService.findallstaff(eventId);
  }
  else{
    throw new Error('You are not authorized to view this page');
  }
  
  
  }

  @Get('/:id/guests')
  @UseGuards(AuthGuard())
  async findallguests(@Param('id') eventId: string,@GetUser() user: IUser): Promise<IGuest[]> {
    const event = await this.eventService.findById(eventId);
    console.log(event)
    if (!event){
      console.log("no event found !!")
    }
    if (user.id !== event.event_manager.id) {
    return this.eventService.findallguests(event._id);
  }
  else{
    throw new Error('You are not authorized to view this page');
  }
  }

  // @Patch('/:id')
  // @UseGuards(AuthGuard())
  // async updateEvent(
  //   @Param('id') eventId: string,
  //   @Body() updateEventDto: UpdateEventDto,
  //   @GetUser() user : IUser,
  // ): Promise<IEvent> {
  //   return await this.eventService.UpdateEvent(eventId, updateEventDto);
  // }

  @Post('/:eventId/guests/:guestId') // Use 'guestId' instead of 'Guest'
@UseGuards(AuthGuard())
async addGuestToEvent(
  @Param('eventId') eventId: string,
  @Param('guestId') guestId: string, // Use 'guestId' instead of 'GuestId'
) {
  const event = await this.eventService.findById(eventId);
  if (!event) {
    console.log("Event not found!");
    return { message: "Event not found" }; // or throw an error
  }

  const guest = await this.eventService.findguestbyid(guestId); // Corrected method name
  if (!guest) {
    console.log("Guest not found");
    return { message: "Guest not found" }; // or throw an error
  }

  const updatedEvent = await this.eventService.addguest(eventId, guest); // Corrected method name
  return updatedEvent;
}


  @Delete('/:eventId/guests/:userId')
  @UseGuards(AuthGuard())
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
  @UseGuards(AuthGuard())
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
  
@Post('invite-guests/:id')
@UseGuards(AuthGuard())
async inviteGuests(
    @Body('emailContent') emailContent: string,
    @Body('selectedEmails') selectedEmails: string[],
    @Param('id') id: string,
) {
    console.log('Request payload received:', { emailContent, selectedEmails, id });
    try {
        // Fetch event details
        const event = await this.eventService.findById(id);
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        if(!event.name){
            throw new NotFoundException('Event Name not found')
        }
        const eventname=event.name
        const inviteLink = `http://localhost:5000/guestformpage/${id}`;

        // Send invitation email
        await this.MailingService.sendInvitationEmail(selectedEmails, eventname, inviteLink, emailContent);

        return { message: 'Guest invitations sent successfully' };
    } catch (error) {
        console.error('Error sending guest invitations:', error);
        return { message: 'Failed to send guest invitations', error };
    }
}


  @Post('invite/staff/:id')
  @UseGuards(AuthGuard())
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
          const emailContent = ''; // Define your email content here
          // Send invitation email
          await this.MailingService.sendInvitationEmail(emails, event.name, inviteLink, emailContent);

          return { message: 'Staff invitations sent successfully' };
      } catch (error) {
          console.error('Error sending staff invitations:', error);
          return { message: 'Failed to send staff invitations', error };
      }
  }

  @Post('guests/:id/assigndriver')
  @UseGuards(AuthGuard())
  async AssignDriverToGuest(
    @Param('id') id: string,
    @GetUser() user : IUser,
    @Body() guest : IGuest,
    @Body() driver : IStaff,
  ) {
    const event = await this.eventService.findById(id);
    if (!event){
      const event = await this.eventService.findById(id);
      if (!event){
        throw new NotFoundException('Event not found');
      }
      //const updatedGuest = await this.eventService.assignDriverToGuest(event.id, guest.id, driver.id);

      //return updatedGuest;
      return
    }
  }

}




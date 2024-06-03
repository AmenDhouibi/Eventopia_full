import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GetUser } from 'src/user/get-user.decorator';
import { IUser } from 'src/user/user.model';
import { CreateGuestDto } from 'src/guest/dto/guest.dto';
import { IGuest } from './guest.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('guest')
export class GuestController {

    constructor(
        private readonly guestService: GuestService,
    ) {}

    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    @Post(':id')
  async create(
    @Param('id') eventId: string,
    @Body() guestData: CreateGuestDto,
  ): Promise<IGuest> {
    const { user, flightId, luggage } = guestData;
    const guest = await this.guestService.createGuest(user, eventId, flightId, luggage);
    return guest;
  }
  
  @Get(':id')
  async findguests(@Param('id') guestId: string): Promise<IGuest | null> {
    return this.guestService.findGuestById(guestId);
  }

}

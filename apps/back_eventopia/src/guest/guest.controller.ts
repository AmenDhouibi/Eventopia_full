import { Body, Controller, Param, Post } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GetUser } from 'src/user/get-user.decorator';
import { IUser } from 'src/user/user.model';
import { CreateGuestDto } from 'src/guest/dto/guest.dto';
import { IGuest } from './guest.model';
import { EventRepository } from '../event/event.repository';

@Controller('guest')
export class GuestController {

    constructor(
        private readonly guestService: GuestService,
    ) {}
    
    @Post()
    async create(
        @Param('id') eventid:string,
        @GetUser() user: IUser,
        @Body() CreateGuestDto :CreateGuestDto,)
        : Promise<IGuest> {
        return this.guestService.createGuest(user.username,eventid,CreateGuestDto.flightId, CreateGuestDto.luggage);
    }
}

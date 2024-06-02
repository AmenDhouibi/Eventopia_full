import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGuest, GuestModel, AvailabilityStatus } from './guest.model';
import { IStaff } from 'src/staff/staff.model';
import { GuestRepository } from './guest.repository';
import { IUser } from 'src/user/user.model';
import { EventRepository } from '../event/event.repository';

@Injectable()
export class GuestService {
    constructor(
        private readonly GuestRepository : GuestRepository,
    ) {}

    async createGuest(user: IUser, event: string, flightId: string,luggage:number): Promise<IGuest> {
        const guest = await this.GuestRepository.createguest(user, event, flightId, luggage);
        return guest
    }



}

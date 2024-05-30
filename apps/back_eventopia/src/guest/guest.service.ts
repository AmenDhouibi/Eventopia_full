import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGuest, GuestModel, AvailabilityStatus } from './guest.model';
import { IStaff } from 'src/staff/staff.model';
import { GuestRepository } from './guest.repository';

@Injectable()
export class GuestService {
    constructor(
        private readonly GuestRepository : GuestRepository,
    ) {}

    async createGuest(username: string, event: string, flightId: string,luggage:number): Promise<IGuest> {
        const guest = await this.GuestRepository.createguest(username, event, flightId, luggage);
        return guest
    }


}

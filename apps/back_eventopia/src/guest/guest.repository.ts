import { Injectable } from '@nestjs/common';
import GuestModel,{ IGuest } from './guest.model';
import StaffModel, { IStaff } from 'src/staff/staff.model';
import { IUser } from 'src/user/user.model';

@Injectable()
export class GuestRepository {
    constructor() {}
    async createguest(userId: IUser['_id'], event: string,flightId: string,luggage:number): Promise<IGuest> {
        const newGuest = new GuestModel({
            user: userId,
            event,
            flightId,
            luggage,
        });
        return newGuest.save();
    }

}
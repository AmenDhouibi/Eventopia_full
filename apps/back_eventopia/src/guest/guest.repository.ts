import { Injectable } from '@nestjs/common';
import GuestModel,{ IGuest } from './guest.model';
import StaffModel, { IStaff } from 'src/staff/staff.model';

@Injectable()
export class GuestRepository {
    constructor() {}
    async createguest(username: string, event: string,flightId: string,luggage:number): Promise<IGuest> {
        const newGuest = new GuestModel({
            username,
            event,
            flightId,
            luggage,
        });
        return newGuest.save();
    }

    async addDriver(guestId: string, driver: IStaff['_id']): Promise<IGuest> {
        const guest = await GuestModel.findById(guestId);
        guest.driver = driver;
        await guest.save();
        return guest;
}
}
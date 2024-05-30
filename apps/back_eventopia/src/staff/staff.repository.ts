import { Injectable } from '@nestjs/common';
import { IGuest } from 'src/guest/guest.model';
import StaffModel,{ IStaff } from 'src/staff/staff.model';

@Injectable()
export class StaffRepository {

    constructor() {} 
    async createStaff(userId: string, eventId: string,trunk_space:number,places:number): Promise<IStaff> {
        const newStaff = new StaffModel({
            userId,
            eventId,
            trunk_space,
            places,
        });
        return newStaff.save();
    }

    async addguests(staffId: string, guestId: string): Promise<boolean> {
        const staff = await StaffModel.findById(staffId);
        staff.guests.push(guestId);
        await staff.save();
        return true;
    }

    async findbyid(id:string) :Promise<IStaff>{
        return StaffModel.findOne({ userId: id });
    }
}

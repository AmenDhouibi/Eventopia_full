import { Injectable } from '@nestjs/common';
import GuestModel,{ IGuest } from './guest.model';
import { IUser } from 'src/user/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GuestRepository {
    constructor(
        @InjectModel('Guest') private readonly GuestModel: Model<IGuest>,

    ) 
    {
    }
    async createguest(userId: IUser['_id'], event: string,flightId: string,luggage:number): Promise<IGuest> {
        const newGuest = new GuestModel({
            user: userId,
            event,
            flightId,
            luggage,
        });
        return newGuest.save();
    }
    async findById(id: string): Promise<IGuest | null> {
        return this.GuestModel.findById(id);
      }


}
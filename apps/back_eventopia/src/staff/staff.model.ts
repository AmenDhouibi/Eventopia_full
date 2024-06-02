import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from 'src/user/user.model';// Adjust the import path as necessary
import { IEvent } from 'src/event/event.model'; // Adjust the import path as necessary
import { IGuest } from 'src/guest/guest.model';

export interface IStaff extends Document {
    userId: IUser;
    eventId: IEvent['_id'];
    trunk_space: number;
    places: number;
    guests: string[];
}

const StaffSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    trunk_space : {type : Number, required : true},
    places : {type : Number, required : true},
    guests : [{type : Schema.Types.ObjectId, ref: 'Guest', required: false}],
});

export const StaffModel = mongoose.model<IStaff>('Staff', StaffSchema);
export default StaffModel;

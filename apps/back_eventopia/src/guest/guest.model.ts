import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../user/user.model';
import { IEvent } from '../event/event.model';
import { IStaff } from '../staff/staff.model';

export enum AvailabilityStatus {
    LINKED_UP = 'linked_up',
    NO_PICK_UP = 'no_pick_up',
}

export interface IGuest extends Document {
    user: IUser['username'];
    event: IEvent['_id'];
    availabilityStatus: AvailabilityStatus;
    flightId: string;
    luggage: number;
    driver: IStaff['_id'];
}

const GuestSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    availabilityStatus: { type: String, enum: Object.values(AvailabilityStatus), required: true ,default : AvailabilityStatus.NO_PICK_UP },
    flightId: { type: String, required: true },
    luggage: { type: Number, required: false },
    driver : { type: Schema.Types.ObjectId, ref: 'Staff', required: false },
});

export const GuestModel = mongoose.model<IGuest>('Guest', GuestSchema);

export default GuestModel;

import mongoose, { Document, Schema } from 'mongoose';
import { IGuest } from 'src/guest/guest.model';
import { IStaff } from 'src/staff/staff.model';
import { IUser } from 'src/user/user.model';

export interface IEvent extends Document {
    name: string;
    place: string;
    time: Date;
    guests: IGuest[];
    staff: IStaff[];
    event_manager: IUser;
    poster: string;
    numberOfAttendees: number;
    description: string;
    sponsors: string[];
    organizingClub: string;
}

const EventSchema: Schema = new Schema({
    name: { type: String, required: false, minlength: 5, maxlength: 50 },
    place: { type: String, required: false },
    time: { type: Date, required: false },
    guests: [{ type: Schema.Types.ObjectId, ref: 'Guests' }],
    staff: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
    event_manager: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    poster: { type: String, required: false },
    numberOfAttendees: { type: Number, required: false },
    description: { type: String, required: false },
    sponsors: [{ type: String}],
    organizingClub: { type: String, required: false }
});

export const EventModel = mongoose.model<IEvent>('Event', EventSchema);

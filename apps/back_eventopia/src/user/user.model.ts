import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    age: number;
    photo: string;
    institution: string;
    profession: string;
    phoneNumber: string;
    events: string[]; // IDs of events where user is participating
    ownedEvents: string[]; // IDs of events owned by user
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true, min: 18 },
    photo: { type: String, required: false },
    institution: { type: String, required: false },
    profession: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }], // Reference to events
    ownedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }], // Reference to events
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;

import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from 'src/user/user.model';
import { UserRole } from './role.enum';

export interface IEventRole extends Document {
    user: IUser['_id'];
    event: string;
    role: UserRole;
}

const EventRoleSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    role: { type: String, enum: Object.values(UserRole), required: true , default: UserRole.USER},
});

export const EventRoleModel = mongoose.model<IEventRole>('EventRole', EventRoleSchema);


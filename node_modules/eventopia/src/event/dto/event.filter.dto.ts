import { IUser } from "src/user/user.model";

export class eventfilterdto {
    eventId?: string;
    eventName?: string;
    eventDate?: Date;
    eventLocation?: string;
    user?: IUser;

}
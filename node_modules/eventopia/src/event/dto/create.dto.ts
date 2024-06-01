import { IUser } from 'src/user/user.model';

export class CreateEventDto {
  name: string;
  place: string;
  time: Date;
  description: string;
  guests: IUser[];
  staff: IUser[];
  event_manager: IUser;
  poster: string;
  numberOfAttendees: number;
  sponsors: IUser[];
  organizingClub: string;
}

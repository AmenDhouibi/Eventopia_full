import { IUser } from 'src/user/user.model';
import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  place: string;

  @IsNotEmpty()
  time: Date;

  @IsOptional()
  description: string;

  @IsOptional()
  sponsors: string[];

  @IsOptional()
  organizingClub: string;

  @IsOptional()
  poster: string;

  @IsOptional()
  numberOfAttendees: number;



}

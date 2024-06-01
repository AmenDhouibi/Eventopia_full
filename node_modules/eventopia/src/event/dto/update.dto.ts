import { IsArray, IsDateString, IsOptional, IsString, MaxLength, MinLength, IsNumber } from 'class-validator';
import { IUser } from 'src/user/user.model';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  place: string;

  @IsOptional()
  @IsDateString()
  time: Date;

  @IsOptional()
  @IsString()
  description: string;


  @IsOptional()
  @IsString()
  poster: string;

  @IsOptional()
  @IsNumber()
  numberOfAttendees: number;

  @IsOptional()
  @IsArray()
  sponsors: IUser[];

  @IsOptional()
  @IsString()
  organizingClub: string;
}

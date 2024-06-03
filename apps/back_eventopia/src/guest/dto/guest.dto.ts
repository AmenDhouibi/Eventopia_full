import { IsNotEmpty, IsNumber, MinLength, MaxLength, IsString } from 'class-validator';
import { IUser } from 'src/user/user.model';

export class CreateGuestDto {
  user: IUser;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(8)
  flightId: string;

  @IsNumber()
  @IsNotEmpty()
  luggage: number;
  

}

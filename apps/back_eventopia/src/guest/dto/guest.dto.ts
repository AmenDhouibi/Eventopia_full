import { IsNotEmpty, IsNumber} from 'class-validator';

export class CreateGuestDto {
  @IsNumber()
  @IsNotEmpty()
  flightId: string;

  @IsNumber()
  @IsNotEmpty()
  luggage: number;

}

import { IsNotEmpty, IsNumber, MinLength, MaxLength, IsString } from 'class-validator';

export class CreateGuestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(8)
  flightId: string;

  @IsNumber()
  @IsNotEmpty()
  luggage: number;
  

}

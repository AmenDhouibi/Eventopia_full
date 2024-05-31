import { IsNotEmpty, IsNumber} from 'class-validator';

export class CreateStaffDto {
  @IsNumber()
  @IsNotEmpty()
  trunk_space: number;

  @IsNumber()
  @IsNotEmpty()
  places: number;

}

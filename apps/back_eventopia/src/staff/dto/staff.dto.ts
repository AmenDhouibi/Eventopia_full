import { IsNotEmpty, IsNumber} from 'class-validator';
import { IUser } from 'src/user/user.model';

export class CreateStaffDto {
  user: IUser;
  
  @IsNumber()
  @IsNotEmpty()
  trunk_space: number;

  @IsNumber()
  @IsNotEmpty()
  places: number;

}

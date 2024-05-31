import { Body, Controller, Param, Post } from '@nestjs/common';
import { StaffService } from './staff.service';
import { IStaff } from './staff.model';
import { IUser } from 'src/user/user.model';
import { GetUser } from 'src/user/get-user.decorator';
import { CreateStaffDto } from './dto/staff.dto';

@Controller('staff')
export class StaffController {

    constructor(
        private readonly staffService: StaffService,
    ) {}

    @Post()
    async createStaff(
        @GetUser() user: IUser,
        @Param('id')eventid :string,
        @Body() CreateStaffDto :CreateStaffDto,)
        : Promise<IStaff> {
        return this.staffService.createStaff(user.username, eventid, CreateStaffDto.trunk_space, CreateStaffDto.places);
    }

    // @Post(':id/guests')
    // async addguests(
    //     @GetUser() user: IUser,
    //     @Body('guestId') guestId: string,
    // ): Promise<boolean> {
    //     const staff = this.staffService.findbyid(user.id);
    //     return this.staffService.addguests((await staff).id, guestId);
    // }
}

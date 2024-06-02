import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { IStaff } from './staff.model';
import { IUser } from 'src/user/user.model';
import { GetUser } from 'src/user/get-user.decorator';
import { CreateStaffDto } from './dto/staff.dto';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from '../event/event.service';

@Controller('staff')
export class StaffController {

    constructor(
        private readonly staffService: StaffService,
    ) {}

    @Post()
    @UseGuards(AuthGuard())
    async createStaff(
        @GetUser() user: IUser,
        @Param('id')eventid :string,
        @Body() CreateStaffDto :CreateStaffDto,)
        : Promise<IStaff> {
        const staff = await this.staffService.createStaff(user.username, eventid, CreateStaffDto.trunk_space, CreateStaffDto.places);
        return staff;
    }

}

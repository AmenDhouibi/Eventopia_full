import { Body, Controller, Param, Post, UseGuards,Get } from '@nestjs/common';
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

    @UseGuards(AuthGuard())
    @Post(':id')
  async create(
    @Param('id') eventId: string,
    @Body() guestData: CreateStaffDto,
  ): Promise<IStaff> {
    const { user, trunk_space, places } = guestData;
    const driver = await this.staffService.createStaff(user._id, eventId, trunk_space, places);
    return driver;
  }

  @Get('/:id')
    async findStaff(@Param('id') staffId: string): Promise<IStaff> {
        return this.staffService.findbyid(staffId);
    }

  

}

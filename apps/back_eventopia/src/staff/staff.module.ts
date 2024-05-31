import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { GuestModule } from 'src/guest/guest.module';
import { StaffRepository } from './staff.repository';

@Module({

  imports: [GuestModule],

  providers: [StaffService, StaffRepository],
  controllers: [StaffController]
})
export class StaffModule {}

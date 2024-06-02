import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { StaffRepository } from './staff.repository';
import { AuthModule } from 'src/auth/auth.module';
import StaffModel from './staff.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: 'Staff', schema: StaffModel.schema }]),
    AuthModule,
  ],

  providers: [StaffService, StaffRepository],
  controllers: [StaffController],
  exports : [StaffRepository, StaffService]
})
export class StaffModule {}

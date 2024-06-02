import { forwardRef, Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { GuestRepository } from './guest.repository';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import GuestModel from './guest.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Guest', schema: GuestModel.schema }]),
    UserModule,
    AuthModule,
  ],
  providers: [GuestService,GuestRepository],
  controllers: [GuestController],
  exports : [GuestRepository,GuestService]
})
export class GuestModule {}

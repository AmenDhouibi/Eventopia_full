import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { GuestRepository } from './guest.repository';

@Module({
  providers: [GuestService,GuestRepository],
  controllers: [GuestController]
})
export class GuestModule {}

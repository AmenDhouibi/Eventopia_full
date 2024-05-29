import { Controller, Get, Param } from '@nestjs/common';
import { FlightService } from './flight.service';

@Controller('flights')
export class FlightController {
    constructor(private readonly flightService: FlightService) {}

    /*
        thezni l page accesible lel event manager wel drivers
        el event manager could edit, el drivers read-only
        el page feha liste mtaa guests, un tableau kol ligne feha 
        guest kif yenzel aal guest ijih un message fih his status
    */
    @Get(':id')
    async getFlightById(@Param('id') id: string) {
        return this.flightService.fetchFlightInformation(id);
    }
}

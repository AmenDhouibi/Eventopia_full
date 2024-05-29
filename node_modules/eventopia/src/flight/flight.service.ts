import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { error } from 'console';

@Injectable()
export class FlightService {
    constructor() {}

    // returns each guest's filght's details by flight number provided by the guest
    async fetchFlightInformation(flight_number: string) {
        const options = {
            method: 'GET',
            url: 'https://flight-radar1.p.rapidapi.com/flights/get-more-info',
            params: {
                query: flight_number,
                fetchBy: 'flight',
            },
            headers: {
                'X-RapidAPI-Key': 'f3ba49759emsh8e54d54382c956ap1c92a2jsnb638caf8b764',
                'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
            }
        };

        try{
            const response = await axios.request(options);
            const data = response.data.result.response.data[0];

            if(data.identification.number.default == flight_number){
                                    
                const arrival_airport = data.airport.destination.name;
                // let scheduled_arrival_time = data.time.scheduled.arrival;
                let real_arrival_time = data.time.real.arrival; // do not convert to date, it can be null
                let estimated_arrival_time = data.time.estimated.arrival; // do not convert to date, it can be null

                if( real_arrival_time == null){
                    if(estimated_arrival_time == null){
                        return `Guest with flight number ${flight_number} has not arrived yet. Estimated arrival time is not defined yet`;
                    }else{
                        estimated_arrival_time = new Date(estimated_arrival_time*1000).toLocaleDateString();
                        return `Guest with flight number ${flight_number} has not arrived yet. Estimated arrival time is ${estimated_arrival_time} at the ${arrival_airport}`;
                    }
                }else{
                    real_arrival_time = new Date(real_arrival_time*1000).toLocaleDateString();
                    return `Guest with flight number ${flight_number} has arrived. Arrival time: ${real_arrival_time} at the ${arrival_airport}`;
                }
            }else{
                return `No matching flight found for flight number ${flight_number}`;
            }
        }
        catch{
            return error;
        }
    }
}

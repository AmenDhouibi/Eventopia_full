import { Injectable } from '@nestjs/common';
import { StaffRepository } from './staff.repository';
import { IStaff } from './staff.model';

@Injectable()
export class StaffService {
    constructor(
        private readonly StaffRepository: StaffRepository,
    ) {}

    async createStaff(userId: string, eventId: string, trunk_space: number, places: number): Promise<IStaff> {
        return this.StaffRepository.createStaff(userId, eventId, trunk_space, places);
    }

    async findbyid(id:string) : Promise<IStaff> {
        return this.StaffRepository.findbyid(id);
    }
}

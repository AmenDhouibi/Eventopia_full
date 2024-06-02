import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly UserRepository: UserRepository
    ) {}

    async addEventToUser(userId: string, eventId: string): Promise<void> {
        const user = await this.UserRepository.Getuser(userId);
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }
    
        user.events.push(eventId);
        await user.save();
      }

    async getUserById(id: string) {
        return await this.UserRepository.Getuser(id);
    }

    async getUserbyusername(username: string) {
        try {
            const user = await this.UserRepository.getUserByUsername(username);
            return user;
        } catch (error) {
            console.error('Error getting user:', error);
            throw error;
        }
    }

    async deleteUser(email: string): Promise<boolean> {
        try {
            const deletedUser = await this.UserRepository.deleteUser(email);
            return deletedUser;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    
}
}

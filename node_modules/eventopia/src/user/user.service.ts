import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly UserRepository: UserRepository
    ) {}

    async getUserById(id: string) {
        return await this.UserRepository.Getuser(id);
    }

    async getUserbyusername(username: string) {
        try {
            const user = await this.UserRepository.Getuser(username);
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

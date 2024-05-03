import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/user-credentials.dto';
import { AuthRepository } from './auth.repository';


@Injectable()
export class AuthService {
    constructor(
        private jwtService : JwtService,
        private readonly AuthRepository: AuthRepository
        ) {}


    async signup(userDto: CreateUserDto) {
        try {
            const savedUser = await this.AuthRepository.signup(userDto);
            return savedUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    async signin(userDto: CreateUserDto): Promise<{ accesstoken: string }> {
        const payload = await this.AuthRepository.signin(userDto);
        
        // Sign the JWT token using the payload
        const accesstoken = this.jwtService.sign(payload);
    
        return { accesstoken };
    }


}

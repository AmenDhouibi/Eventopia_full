import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser, UserModel } from '../user/user.model';
import { CreateUserDto } from './dto/user-credentials.dto';
import * as bcrypt from 'bcrypt'
import { Jwtpayload } from './jwt-payload.interface';



@Injectable()
export class AuthRepository  {

    async signup(userDto: CreateUserDto) {

        const { username, email, password, age, photo, institution, profession, phonenumber } = userDto;

        const salt = await bcrypt.genSalt()

        const passwordhashed = await bcrypt.hash(password, salt)

        // Create a new user document
        const newUser = new UserModel({
            username,
            email,
            password: passwordhashed,
            age,
            photo,
            institution,
            profession,
            phonenumber,
            events: [],
            ownedEvents: []
        });
        const savedUser = await newUser.save();

        return savedUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; 
    }

    async signout() {
        // Implement signout logic here
    }

    async signin(userDto: CreateUserDto): Promise<Jwtpayload> {
        const { email, password } = userDto;
        const user = await UserModel.findOne({ email });
    
        if (user && await bcrypt.compare(password, user.password)) {
            // User authentication successful, generate JWT token payload
            const payload: Jwtpayload = { user_id: user._id };
            return payload;
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    
}

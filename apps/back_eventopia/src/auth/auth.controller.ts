import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user-credentials.dto';
import { MailingService } from '../mailing/mailing.service';



@Controller('auth')
export class UserController {
    constructor(
        private readonly AuthService: AuthService,
        private readonly MailingService: MailingService
    ) {}

    

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const newUser = await this.AuthService.signup(createUserDto);
        this.MailingService.sendWelcomeEmail(newUser.email);
        return newUser;
    }

    @Post('signin')
    async signin(@Body() createUserDto: CreateUserDto): Promise<{ accesstoken: string }>
    {
        const response = await this.AuthService.signin(createUserDto);
        return response;
    }


   }


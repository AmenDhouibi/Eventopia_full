import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) {}


    @Get('/:email')
    async getUser(@Param('email') email: string) {
        const user = await this.UserService.getUserbyusername(email);
        return user;
  }

  @Delete('delete')
  async deleteUser(@Body('email') email: string): Promise<boolean> {
      const response = await this.UserService.deleteUser(email);
      return response;
  }
}

import { Controller, Body,Post, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

 @Post()
  async createUser(@Body() body:{name: string; email: string; password: string}) {
   try {
     return this.userService.createUser(body);
   } catch (error) {
      return error
   }
  }
}

import { Controller, Body, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
   @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 409, description: 'A user with this email already exists.' })
  @ApiResponse({ status: 400, description: 'Bad Request. The data sent is invalid.' })
  @ApiBody({
      description: 'Data needed to create a new user.',
      type: CreateUserDto,
  })
  async createUser(@Body()createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}

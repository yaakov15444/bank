// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * This is the function you are asking about.
   * Its job is to call the validateUser function from the UserService.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.validateUser(email, pass);

    if (user) {
      // The validateUser function in UserService already removes the password
      return user;
    }

    return null;
  }

  /**
   * This function creates the token after the user has been validated.
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

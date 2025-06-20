import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // By default, passport-local expects "username" and "password".
    // Since we use "email", we can configure it here.
    super({ usernameField: 'email' });
  }

  // This function will be called automatically by the AuthGuard('local')
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    return user;
  }
}

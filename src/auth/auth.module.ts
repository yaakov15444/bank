import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller'; // <-- 1. Import the controller
import { LocalStrategy } from './local.strategy'; // <-- 2. Import the strategy
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy], // <-- 3. Add LocalStrategy to providers
  controllers: [AuthController], // <-- 4. Add AuthController to controllers
})
export class AuthModule {}

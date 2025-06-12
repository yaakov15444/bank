import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AppError } from 'src/common/AppError';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async createUser(data: { name: string; email: string; password: string }) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(data.password, salt);
      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword
        }
      });
      if (
        !user
      ) throw new AppError('User not created', 500);
      const { password, ...userWithoutPassword } = user;
      return (
        userWithoutPassword
      )
    } catch (error) {
      if (error.code === 'P2002') {
        throw new AppError('A user with this email already exists.', 409); // 409 Conflict is a good choice
      }
      throw new AppError(error.message, 500, error);
    }
  }
}

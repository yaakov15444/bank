import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class UserService {
 
  async createUser(data:{name: string; email: string; password: string}) {
    return await prisma.user.create({data});
  }
}

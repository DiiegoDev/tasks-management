import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';
import { PrismaUsersMapper } from '../mappers/prisma-users.mapper';

@Injectable()
export class PrismaUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<PrismaUser> {
    const response = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!response) return null;

    return response;
  }

  async create(data: User): Promise<void> {
    const user = PrismaUsersMapper.toPrisma(data);

    await this.prisma.user.create({ data: user });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { IUserRepsoitory } from 'src/repositories/users.repository';
import { User } from 'src/users/entities/user.entity';
import { PrismaUsersMapper } from '../mappers/prisma-users.mapper';

@Injectable()
export class PrismaUserRepository implements IUserRepsoitory {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const response = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!response) return null;

    return PrismaUsersMapper.toDomain(response);
  }

  async create(data: User): Promise<User | null> {
    const user = PrismaUsersMapper.toPrisma(data);

    const response = await this.prisma.user.create({ data: user });

    return PrismaUsersMapper.toDomain(response);
  }
}

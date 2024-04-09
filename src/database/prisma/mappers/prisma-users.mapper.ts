import { User } from 'src/users/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUsersMapper {
  static toPrisma(data: User): PrismaUser {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      googleId: data.googleId,
      picture: data.picture,
      password: data.password,
      createdAt: data.createdAt,
    };
  }

  static toDomain(data: PrismaUser): User {
    return new User(data);
  }
}

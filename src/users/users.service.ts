import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserAlreadExist } from './errors/users.errors';
import { PrismaUserRepository } from 'src/database/prisma/repositories/prisma-users.repositoy';

@Injectable()
export class UsersService {
  constructor(private userRepository: PrismaUserRepository) {}

  async create(request: CreateUserDto): Promise<void> {
    const newUser = new User(request);

    const emailAlreadyExist = await this.userRepository.findByEmail(
      request.email,
    );

    if (emailAlreadyExist) throw new UserAlreadExist();

    await this.userRepository.create(newUser);
  }
}

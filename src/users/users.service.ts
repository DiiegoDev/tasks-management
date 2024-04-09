import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { IUserRepsoitory } from 'src/repositories/users.repository';
import { User } from './entities/user.entity';
import { UserAlreadExist } from './errors/users.errors';

@Injectable()
export class UsersService {
  constructor(private userRepository: IUserRepsoitory) {}

  async create(request: CreateUserDto) {
    const newUser = new User(request);

    const emailAlreadyExist = await this.userRepository.findByEmail(
      request.email,
    );

    if (emailAlreadyExist) throw new UserAlreadExist();

    const response = await this.userRepository.create(newUser);

    return response;
  }
}

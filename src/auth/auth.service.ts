import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserRepository } from 'src/database/prisma/repositories/prisma-users.repositoy';
import * as bcrypt from 'bcrypt';

interface LoginProps {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private userRepository: PrismaUserRepository,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginProps) {
    const tokenJwt = this.tokenJwt(data.email, data.id);
    return this.decodeJwt(tokenJwt);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch)
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        createdAt: user.createdAt,
      };

    return null;
  }

  tokenJwt(email: string, sub: string) {
    const payload = { email, sub };

    return this.jwtService.sign(payload);
  }

  decodeJwt(token: string) {
    const response = this.jwtService.decode(token);
    return {
      id: response.sub,
      email: response.email,
      exp: response.exp,
      token,
    };
  }
}

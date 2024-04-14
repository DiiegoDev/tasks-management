import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserRepository } from 'src/database/prisma/repositories/prisma-users.repositoy';
import { User } from 'src/users/entities/user.entity';

interface LoginProps {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

interface GoogleUserProps {
  providerId: string;
  email: string;
  name: string;
  picture: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userRepository: PrismaUserRepository,
    private jwtService: JwtService,
  ) {}
  async login(data: LoginProps) {
    return this.tokenJwt(data.email, data.id);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (user && user.password === password)
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        googleId: user.googleId,
        picture: user.picture,
        createdAt: user.createdAt,
      };

    return null;
  }

  async googleLogin(user: GoogleUserProps) {
    const userExist = await this.userRepository.findByEmail(user.email);

    if (!userExist) {
      const newUser = new User({
        email: user.email,
        googleId: user.providerId,
        name: user.name,
        picture: user.picture,
      });

      await this.userRepository.create(newUser);

      return this.tokenJwt(newUser.email, newUser.id);
    }

    return this.tokenJwt(userExist.email, userExist.id);
  }

  tokenJwt(email: string, sub: string) {
    const payload = { email, sub };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

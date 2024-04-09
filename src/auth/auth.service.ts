import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepsoitory } from 'src/repositories/users.repository';
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
    private userRepository: IUserRepsoitory,
    private jwtService: JwtService,
  ) {}
  async login(data: LoginProps) {
    const payload = { email: data.email, sub: data.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
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

      const data = await this.userRepository.create(newUser);

      const payload = { email: data.email, sub: data.id };

      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    const payload = { email: userExist.email, sub: userExist.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

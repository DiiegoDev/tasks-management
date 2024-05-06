import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api')
export class AuthController {
  constructor(private auhtservice: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/auth/login')
  async auth(@Request() req) {
    const data = await this.auhtservice.login(req.user);

    return data;
  }
}

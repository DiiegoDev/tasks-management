import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Controller('api')
export class AuthController {
  constructor(private auhtservice: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/auth/login')
  async auth(@Request() req) {
    const { access_token } = await this.auhtservice.login(req.user);

    return { access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth/profile')
  async profile(@Request() req) {
    return req.user;
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  googleAuth(@Request() req) {}

  @Get('/auth/google/redirect')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Request() req) {
    return this.auhtservice.googleLogin(req.user);
  }
}

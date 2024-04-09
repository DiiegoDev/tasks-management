import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadExist extends HttpException {
  constructor() {
    super('E-mail ou nome de usuário já existe!', HttpStatus.BAD_REQUEST);
  }
}

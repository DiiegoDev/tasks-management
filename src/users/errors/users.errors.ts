import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadExist extends HttpException {
  constructor() {
    super('E-mail já cadastrado', HttpStatus.BAD_REQUEST);
  }
}

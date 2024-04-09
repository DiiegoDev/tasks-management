import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-users.repositoy';
import { IUserRepsoitory } from 'src/repositories/users.repository';

@Module({
  providers: [
    PrismaService,
    { provide: IUserRepsoitory, useClass: PrismaUserRepository },
  ],
  exports: [IUserRepsoitory],
})
export class DatabaseModule {}

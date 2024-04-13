import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-users.repositoy';
import { IUserRepsoitory } from 'src/repositories/users.repository';
import { ITasksRepository } from 'src/repositories/tasks.repository';
import { PrismaTasksRepository } from './prisma/repositories/prisma-tasks.repository';

@Module({
  providers: [
    PrismaService,
    { provide: IUserRepsoitory, useClass: PrismaUserRepository },
    { provide: ITasksRepository, useClass: PrismaTasksRepository },
  ],
  exports: [IUserRepsoitory, ITasksRepository],
})
export class DatabaseModule {}

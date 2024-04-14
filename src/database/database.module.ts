import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-users.repositoy';

import { PrismaTasksRepository } from './prisma/repositories/prisma-tasks.repository';

@Module({
  providers: [PrismaService, PrismaUserRepository, PrismaTasksRepository],
  exports: [PrismaUserRepository, PrismaTasksRepository],
})
export class DatabaseModule {}

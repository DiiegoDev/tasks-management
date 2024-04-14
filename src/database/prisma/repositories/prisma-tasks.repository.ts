import { Task } from 'src/tasks/entities/task.entity';
import { Task as PrismaTask } from '@prisma/client';
import { PrismaTasksMapper } from '../mappers/prisma-tasks.mapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTasksRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Task): Promise<void> {
    const task = PrismaTasksMapper.toPrisma(data);

    await this.prisma.task.create({ data: task });
  }

  async findOne(taskId: string): Promise<PrismaTask> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    return task;
  }

  async findMany(userId: string): Promise<PrismaTask[]> {
    const tasks = await this.prisma.task.findMany({ where: { userId } });

    return tasks;
  }

  async update(taskId: string, data: Task): Promise<void> {
    const task = PrismaTasksMapper.toPrisma(data);

    await this.prisma.task.update({ where: { id: taskId }, data: task });
  }

  async deleteOne(taskId: string): Promise<void> {
    await this.prisma.task.delete({ where: { id: taskId } });
  }

  async deleteMany(userId: string): Promise<void> {
    await this.prisma.task.deleteMany({ where: { userId, status: 'Done' } });
  }
}

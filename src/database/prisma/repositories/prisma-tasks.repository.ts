import { ITasksRepository } from 'src/repositories/tasks.repository';
import { Task } from 'src/tasks/entities/task.entity';
import { PrismaTasksMapper } from '../mappers/prisma-tasks.mapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTasksRepository implements ITasksRepository {
  constructor(private prisma: PrismaService) {}
  async getOneTask(taskId: string): Promise<any> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    //return PrismaTasksMapper.toDomain(task);
    return task;
  }

  async updateTaskStatus(taskId: string, data: Task): Promise<void> {
    await this.prisma.task.update({ where: { id: taskId }, data });
  }

  async getTasksByUser(userId: string): Promise<any> {
    const tasks = await this.prisma.task.findMany({ where: { userId } });

    return tasks;
  }

  async create(data: Task): Promise<any> {
    const task = PrismaTasksMapper.toPrisma(data);

    const response = await this.prisma.task.create({ data: task });

    return PrismaTasksMapper.toDomain(response);
  }
}

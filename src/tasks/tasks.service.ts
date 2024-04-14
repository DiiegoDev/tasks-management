import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { PrismaTasksRepository } from 'src/database/prisma/repositories/prisma-tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: PrismaTasksRepository) {}

  async createTask(data: CreateTaskDto): Promise<void> {
    const task = new Task({
      ...data,
      dueDate: new Date(),
    });

    return await this.tasksRepository.create(task);
  }

  async findTasksByUser(userId: string) {
    return await this.tasksRepository.findMany(userId);
  }

  async updateTaskStatus(taskId: string, status: string): Promise<void> {
    const task = await this.tasksRepository.findOne(taskId);

    if (!task)
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);

    const updatedTask = new Task(task);
    updatedTask.status = status;

    await this.tasksRepository.update(taskId, updatedTask);
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.tasksRepository.deleteOne(taskId);
  }

  async deleteAllDoneTasks(userId: string) {
    await this.tasksRepository.deleteMany(userId);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITasksRepository } from 'src/repositories/tasks.repository';
import { Priority, Status, Task, Type } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: ITasksRepository) {}
  async create(data: CreateTaskDto) {
    const task = new Task({
      ...data,
      dueDate: new Date(),
      type: Type[data.type],
      status: Status[data.status],
      priority: Priority[data.priority],
    });

    return await this.tasksRepository.create(task);
  }

  async getTasksByUser(userId: string) {
    return await this.tasksRepository.getTasksByUser(userId);
  }

  async updateTaskStatus(taskId: string, status: Status) {
    const task = await this.tasksRepository.getOneTask(taskId);

    if (!task)
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);

    const updatedTask = new Task(task);
    updatedTask.status = Status[status];
    // await this.tasksRepository.updateTaskStatus(taskId, updatedTask);

    console.log(updatedTask);

    return updatedTask;
  }
}

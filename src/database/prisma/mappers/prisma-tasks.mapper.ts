import { Priority, Status, Task, Type } from 'src/tasks/entities/task.entity';
import { Task as PrismaTask } from '@prisma/client';

export class PrismaTasksMapper {
  static toPrisma(data: Task): PrismaTask {
    return {
      id: data.id,
      title: data.title,
      type: data.type,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      userId: data.userId,
    };
  }

  static toDomain(data: PrismaTask) {
    const task = {
      ...data,
      type: Type[data.type],
      status: Status[data.status],
      priority: Priority[data.priority],
    };
    return new Task(task);
  }
}

import { Task } from 'src/tasks/entities/task.entity';
import { Task as PrismaTask } from '@prisma/client';

export class PrismaTasksMapper {
  static toPrisma(data: Task): PrismaTask {
    return {
      id: data.id,
      title: data.title,
      label: data.label,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      userId: data.userId,
    };
  }

  static toDomain(data: PrismaTask) {
    return new Task(data);
  }
}

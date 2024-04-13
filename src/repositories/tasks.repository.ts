import { Task } from 'src/tasks/entities/task.entity';

export abstract class ITasksRepository {
  abstract create(data: Task): Promise<any>;
  abstract getTasksByUser(userId: string): Promise<Task[]>;
  abstract updateTaskStatus(taskId: string, data: Task): Promise<void>;
  //abstract updateTaskToDone(TaskId: string, data: Task): Promise<void>;
  abstract getOneTask(taskId: string): Promise<Task>;
}

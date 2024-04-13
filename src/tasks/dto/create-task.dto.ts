import { Priority, Status, Type } from '../entities/task.entity';

export class CreateTaskDto {
  userId: string;
  title: string;
  type: Type;
  status: Status;
  priority: Priority;
  dueDate?: Date;
}

//import { Priority, Status, Label } from '../entities/task.entity';

export class CreateTaskDto {
  userId: string;
  title: string;
  label: string;
  priority: string;
  dueDate: Date;
}

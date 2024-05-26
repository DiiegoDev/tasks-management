//import { Status } from '../entities/task.entity';

export interface UpdateTaskDto {
  title?: string;
  label?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
}

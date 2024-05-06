import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/task/create')
  async create(@Body() request: CreateTaskDto) {
    return await this.tasksService.createTask(request);
  }

  @Get('/tasks/:userId')
  async getTasksById(@Param('userId') userId: string) {
    return await this.tasksService.findTasksByUser(userId);
  }

  @Put('/task/update/:taskId')
  async updateTaskStatus(
    @Body() request: UpdateTaskDto,
    @Param('taskId') taskId: string,
  ) {
    console.log(taskId);
    return await this.tasksService.updateTaskStatus(taskId, request.status);
  }

  @Delete('/task/delete/:taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    await this.tasksService.deleteTask(taskId);
  }

  @Delete('task/delete/all-done/:userId')
  async deleteAlltasksDone(@Param('userId') userId: string) {
    await this.tasksService.deleteAllDoneTasks(userId);
  }
}

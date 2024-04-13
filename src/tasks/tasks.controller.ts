import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('api')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/task/create')
  async create(@Body() request: CreateTaskDto) {
    return await this.tasksService.create(request);
  }

  @Get('/tasks/:userId')
  async getTasksById(@Param('userId') userId) {
    return await this.tasksService.getTasksByUser(userId);
  }

  @Put('/task/update/:taskId')
  async updateTaskStatus(
    @Body() request: UpdateTaskDto,
    @Param('taskId') taskId,
  ) {
    return await this.tasksService.updateTaskStatus(taskId, request.status);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { createResponse } from 'src/common/response';
import { CreateTaskDto } from 'src/dto/createTaskDto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    const data = await this.taskService.createTask(body);

    return createResponse(201, data);
  }
}

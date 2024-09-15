import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createResponse } from 'src/common/response';
import { RequestTaskDto, ResponseTaskDto } from 'src/dto/createTaskDto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createTask(@Body() body: RequestTaskDto) {
    const data = await this.taskService.createTask(body);

    const response: ResponseTaskDto = {
      id: data.id,
      task_name: data.task_name,
      task_description: data.task_description,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
    return createResponse(201, response);
  }

  @Get()
  async getTasks() {
    const data = await this.taskService.getTasks();

    const response: ResponseTaskDto[] = data.map((task) => {
      return {
        id: task.id,
        task_name: task.task_name,
        task_description: task.task_description,
        created_at: task.created_at,
        updated_at: task.updated_at,
      };
    });
    return createResponse(200, response);
  }

  @Get(':id')
  async getTask(@Param('id') id: number) {
    const data = await this.taskService.getTask(+id);

    if (!data) {
      return createResponse(404);
    }
    return createResponse(200, data);
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() body: RequestTaskDto) {
    const data = await this.taskService.updateTask(+id, body);

    if (!data) {
      return createResponse(404);
    }

    const response: ResponseTaskDto = data;
    return createResponse(200, response);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    const data = await this.taskService.deleteTask(+id);

    if (!data) {
      return createResponse(404);
    }
    return createResponse(200, data);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/createTaskDto';

@Injectable()
export class TaskService {
  async createTask(body: CreateTaskDto) {
    return {
      title: body.task_name,
      description: body.task_description,
    };
  }
}

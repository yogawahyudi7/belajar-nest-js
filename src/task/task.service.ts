import { Injectable } from '@nestjs/common';
import { RequestTaskDto } from 'src/dto/createTaskDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: RequestTaskDto) {
    const task = await this.prisma.task.create({
      data: data,
    });
    return task;
  }

  async getTasks() {
    return await this.prisma.task.findMany({
      where: {
        deleted_at: null,
      },
    });
  }

  async getTask(id: number) {
    return await this.prisma.task.findFirst({
      where: {
        id: id,
        deleted_at: null,
      },
    });
  }

  async updateTask(id: number, data: RequestTaskDto) {
    try {
      const task = await this.prisma.task.update({
        where: {
          id: id,
          deleted_at: null,
        },
        data: {
          ...data,
          updated_at: new Date(),
        },
      });
      return task;
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      }
      return error;
    }
  }

  async deleteTask(id: number) {
    try {
      const task = await this.prisma.task.update({
        where: {
          id: id,
        },
        data: {
          deleted_at: new Date(),
        },
      });
      return task;
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      }
      return error;
    }
  }
}

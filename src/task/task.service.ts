import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/createTask.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDTO) {
    const { title } = data;
    const existingTask = await this.prisma.task.findFirst({
      where: {
        title,
      },
    });

    if (existingTask) {
      throw new HttpException('Task already exists', HttpStatus.CONFLICT);
    }

    return await this.prisma.task.create({
      data,
    });
  }

  async findTaskById(id: number) {
    return await this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAllTheTasks() {
    return await this.prisma.task.findMany();
  }

  async updateTasksInformation(id: number, data: UpdateTaskDTO) {
    const existingTask = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!existingTask) {
      throw new HttpException('Task was not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteTask(id: number) {
    const existingTask = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!existingTask) {
      throw new HttpException('Task was not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async attachUserToTask(taskId: string, userId: string) {
    return this.prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        responsibleUser: {
          connect: {
            id: parseInt(userId),
          },
        },
      },
      include: {
        responsibleUser: true,
      },
    });
  }

  async createTaskWithUserAttached(userId: number, data: CreateTaskDTO) {
    const existingTask = await this.prisma.task.findFirst({
      where: {
        title: data.title,
      },
    });

    if (existingTask) {
      throw new HttpException('Task already exists', HttpStatus.BAD_REQUEST);
    } else {
      const createdTask = await this.prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          responsibleUser: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          responsibleUser: true,
        },
      });
      return createdTask;
    }
  }

  async deleteAttachedUser(taskId: string) {
    return this.prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        responsibleUser: {
          disconnect: true,
        },
      },
    });
  }

  async setStatusState(id: string) {
    const updateTaskStatus = await this.prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: 'FINISHED',
      },
    });
    return this.deleteTask(parseInt(id));
  }
}

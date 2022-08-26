import {
  Controller,
  Param,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/createTask.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/createTask')
  createTaskWithUser(@Body() data: CreateTaskDTO) {
    return this.taskService.createTask(data);
  }

  @Get('/getTasks')
  findManyTasks() {
    return this.taskService.findAllTheTasks();
  }

  @Get('/getTasks/:id')
  findOneTask(@Param() id: number) {
    return this.taskService.findTaskById(id);
  }

  @Patch('/updateTask/:id')
  updateTask(@Param() id: number, @Body() data: UpdateTaskDTO) {
    return this.taskService.updateTasksInformation(id, data);
  }

  @Delete('/deleteTask/:id')
  deleteTask(@Param() id: number) {
    return this.taskService.deleteTask(id);
  }

  @Put('/attach/:taskId/:userId')
  attachUser(@Param('taskId') taskId: string, @Param('userId') userId: string) {
    return this.taskService.attachUserToTask(taskId, userId);
  }

  @Post('/taskwithuser/:userId')
  createTaskWithUserAttached(
    @Param('userId') userId: number,
    @Body() data: CreateTaskDTO,
  ) {
    return this.taskService.createTaskWithUserAttached(userId, data);
  }

  @Put('/dettachUser/:taskId')
  dettachUserFromTask(@Param('taskId') taskId: string) {
    return this.taskService.deleteAttachedUser(taskId);
  }

  @Put('/updateTaskStatus/:taskId')
  updateTaskStatus(@Param('taskId') taskId: string) {
    return this.taskService.setStatusState(taskId);
  }
}

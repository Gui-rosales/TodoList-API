import {
  Controller,
  Param,
  Post,
  Body,
  Get,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/createTask.dto';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/dto/role.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/createTask')
  createTaskWithUser(@Body() data: CreateTaskDTO) {
    return this.taskService.createTask(data);
  }

  @Roles(Role.Admin, Role.Worker)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getTasks')
  findManyTasks() {
    return this.taskService.findAllTheTasks();
  }
  
  @Roles(Role.Admin, Role.Worker)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getTask/:taskId')
  findOneTask(@Param("taskId") taskId: string) {
    return this.taskService.findTaskById(+taskId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/updateTask/:taskId')
  updateTask(@Param("taskId") taskId: string, @Body() data: UpdateTaskDTO) {
    return this.taskService.updateTasksInformation(+taskId, data);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/deleteTask/:taskId')
  deleteTask(@Param("taskId") taskId: string) {
    return this.taskService.deleteTask(+taskId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/attachUser/:taskId/:userId')
  attachUser(@Param('taskId') taskId: string, @Param('userId') userId: string) {
    return this.taskService.attachUserToTask(+taskId, +userId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/newTaskWithUserAttached/:userId')
  createTaskWithUserAttached(
    @Param('userId') userId: string,
    @Body() data: CreateTaskDTO,
  ) {
    return this.taskService.createTaskWithUserAttached(+userId, data);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/dettachUserFromTask/:taskId')
  dettachUserFromTask(@Param('taskId') taskId: string) {
    return this.taskService.deleteAttachedUser(+taskId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/updateTaskStatus/:taskId')
  updateTaskStatus(@Param('taskId') taskId: string) {
    return this.taskService.setStatusState(+taskId);
  }
}

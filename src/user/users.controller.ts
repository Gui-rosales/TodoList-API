import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/users.create.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from './dto/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  signUp(@Body() CreateUserDTO: CreateUserDTO) {
    return this.userService.createUser(CreateUserDTO);
  }

  @Roles(Role.Admin, Role.Worker)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getUsers')
  getAllUsers(){
    return this.userService.getAllUsers();
  }

  @Roles(Role.Admin, Role.Worker)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/findUser/:userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findUserWithTask(userId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/attatchUser/:userId/:taskId')
  attatchUserToNewPost(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.userService.attachUserToPost(+userId, +taskId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/deleteUser/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(+userId);
  }
}

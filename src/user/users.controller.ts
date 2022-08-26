import { Body, Controller, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { CreateUserDTO } from './dto/users.create.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) {}

    @Post('/signup')
    signUp(@Body() CreateUserDTO: CreateUserDTO){
        return this.userService.createUser(CreateUserDTO);
    }

    @Get('/findUser/:userId')
    findOne(@Param('userId') userId:number){
        return this.userService.findUser(userId);
    }

    @Put('/attatchUser/:userId/:taskId')
    userCreateANewPost(@Param('userId') userId: string, @Param('taskId') taskId: string){
        return this.userService.attachUserToPost(userId, taskId);
    }


}

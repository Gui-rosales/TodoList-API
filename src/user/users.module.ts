import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TaskModule } from 'src/task/task.module';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  imports: [TaskModule],
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}

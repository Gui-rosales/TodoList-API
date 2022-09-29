import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, TaskModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/user/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { localStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '60s'},
  })],
  providers: [AuthService, localStrategy],
  exports: [AuthService]
})
export class AuthModule {}

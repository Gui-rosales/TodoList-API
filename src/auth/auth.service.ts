import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.usersService.findUser(email);
        const validPassword = await compare(password, user.password)
        if (!user){
            throw new NotAcceptableException('Could not find the user')
        }
        if(user && validPassword){
            return {
                userId: user.id,
                userEmail: user.email
            }
        }
        return null;
    }
    async login(user:any){
        const payload = { username: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
    













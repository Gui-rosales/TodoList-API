import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { updateUserDTO } from './dto/user.update.dto';
import { CreateUserDTO } from './dto/users.create.dto';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}

    async createUser(CreateUserDTO: CreateUserDTO): Promise<any>{
        const {password, email} = CreateUserDTO;
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser){
            throw new HttpException("User already exists", HttpStatus.UNAUTHORIZED);
        }

        const hashedPassword = await bcrypt.hash( password, saltRounds );
        
        return await this.prisma.user.create({
           data: {
            email: email,
            password: hashedPassword
           }
        });
    }
    
    async findUser(id: string){
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id: parseInt(id) 
            },
            select: {
                email: true,
                role: true,
                task: {
                    select: {
                        title: true,
                        description: true,
                        status: true
                    }
                }
            }
        });

        if(!existingUser){
            throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
        }
        return existingUser;
    }

    async updateUser(id: number, data: updateUserDTO): Promise <any>{
        const existingUser = await this.prisma.user.update({
            data,
            where: {
                id
            }
        });
    }
    async deleteUser(id: number){
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id
            }
        });

        if(existingUser){
            return this.prisma.user.delete({
                where: {
                    id
                }
            });
        } else {
            throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
        }
    }

    async attachUserToPost(userId: string, taskId: string){
        
        
        const getUser = this.prisma.user.update({
            where: {
                id: parseInt(userId)
            },
            data: {
                task: {
                    connect: {
                        id: parseInt(taskId)
                    }
                }
            },
            include: {
                task: true
            }
        });

        return getUser;
    }





}

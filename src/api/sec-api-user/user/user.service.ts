import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export abstract class UserService {
  abstract createUserHandler(createUserDto: CreateUserDto): Promise<any>;
  abstract updateUserHandler(id: string, updateUserDto: UpdateUserDto): Promise<any>;
  abstract deleteUserHandler(id: string): Promise<any>;
  abstract loginHandler(loginDto: LoginDTO): Promise<any>;
  abstract findAll(findUserDto: FindUserDto): Promise<any>;
  abstract findOne(id: string): Promise<any>;
  abstract unblockUserHandle(id: string): Promise<any>;
}

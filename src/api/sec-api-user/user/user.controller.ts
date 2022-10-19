import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export abstract class UserController {
  abstract findAll(body: FindUserDto): Promise<any>;
  abstract create(createUserDto: CreateUserDto): Promise<any>;
  // abstract login(loginParam: LoginDTO): Promise<any>;
  abstract findOne(id: string): Promise<any>;
  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
  abstract remove(id: string): Promise<any>;
  abstract unblock(id: string): Promise<any>;
}

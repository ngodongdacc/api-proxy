import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export abstract class UserController {
  abstract findAll(req: Request): Promise<any>;
  abstract create(req: Request): Promise<any>;
  // abstract login(loginParam: LoginDTO): Promise<any>;
  abstract findOne(req: Request): Promise<any>;
  abstract update(req: Request): Promise<any>;
  abstract remove(req: Request): Promise<any>;
  abstract unblock(req: Request): Promise<any>;
}

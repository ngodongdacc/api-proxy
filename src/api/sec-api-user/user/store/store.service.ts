import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserProvider } from '../provider/user.provider';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class StoreService implements IUserProvider {
  constructor(private userProvider: IUserProvider) {}
  loginHandler(loginDto: LoginDTO): Promise<any> {
    throw new Error('Method not implemented.');
  }
  createUserHandler(createUserDto: CreateUserDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateUserHandler(updateUserDto: UpdateUserDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteUserHandler(deleteUserDto: DeleteUserDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

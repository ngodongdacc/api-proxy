import { CreateUserDto } from '../dto/create-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { LoginDTO } from '../dto/login.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export abstract class IUserProvider {
  abstract createUserHandler(createUserDto: CreateUserDto): Promise<any>;
  abstract updateUserHandler(updateUserDto: UpdateUserDto): Promise<any>;
  abstract deleteUserHandler(deleteUserDto: DeleteUserDto): Promise<any>;
  abstract loginHandler(loginDto: LoginDTO): Promise<any>;
}

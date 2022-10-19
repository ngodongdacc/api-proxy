import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientService } from 'src/common/service/client.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { LoginDTO } from '../dto/login.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../user.service';

@Injectable()
export class SsaSchoolService implements UserService {
  private api: string;
  constructor(private configService: ConfigService, private clientService: ClientService) {
    const secUserApi = this.configService.get<string>('sec_user.api');
    this.api = secUserApi + '/api/user/ssa-school';
  }
  loginHandler(loginDto: LoginDTO): Promise<any> {
    return 'Do not implement' as any;
  }

  async createUserHandler(createUserDto: CreateUserDto) {
    this.clientService.post(this.api, createUserDto);
  }

  async updateUserHandler(id: string, updateUserDto: UpdateUserDto) {
    this.clientService.put(`${this.api}/${id}`, updateUserDto);
  }

  async deleteUserHandler(id: string) {
    this.clientService.delete(`${this.api}/${id}`);
  }

  async findAll(param: FindUserDto) {
    console.log('param', param);
    
    this.clientService.get(this.api, param);
  }

  async findOne(id: string) {
    this.clientService.get(`${this.api}/${id}`);
  }

  async unblockUserHandle(id: string) {
    this.clientService.put(`${this.api}/unblock/${id}`);
  }

  login(parram: LoginDTO) {
    // Implement later when needed
  }
}

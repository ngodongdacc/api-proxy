import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientService, Http } from 'src/common/service/client.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { LoginDTO } from '../dto/login.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../user.service';

@Injectable()
export class SsaSchoolService implements UserService {
  private api: string;
  constructor(private configService: ConfigService, private clientService: Http) {
    const secUserApi = this.configService.get('sec_user.api');
    this.api = secUserApi + '/user/ssa-school';
  }
  loginHandler(loginDto: LoginDTO): Promise<any> {
    return 'Do not implement' as any;
  }

  async createUserHandler(createUserDto: CreateUserDto) {
    return // this.clientService.post(this.api, createUserDto);
  }

  async updateUserHandler(id: string, updateUserDto: UpdateUserDto) {
    // return this.clientService.put(`${this.api}/${id}`, updateUserDto);
  }

  async deleteUserHandler(id: string) {
    return // this.clientService.delete(`${this.api}/${id}`);
  }

  async findAll(param: FindUserDto) {
    return // this.clientService.get(this.api, param);
  }

  async findOne(id: string) {
    // this.clientService.get(`${this.api}/${id}`);
  }

  async unblockUserHandle(id: string) {
    // this.clientService.put(`${this.api}/unblock/${id}`);
  }

  login(parram: LoginDTO) {
    // Implement later when needed
  }
}

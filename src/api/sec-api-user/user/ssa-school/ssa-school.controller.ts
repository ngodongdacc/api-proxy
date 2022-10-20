import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Request, Header, Headers, } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { ClientService, Http } from 'src/common/service/client.service';
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

@ApiBearerAuth()
@ApiTags('SSA School')
@Controller('ssa-school')
// @UseGuards(AuthorizationGuard) // comment to bypass authentication for local testing
export class SsaSchoolController implements UserController {
  constructor(private readonly clientService: Http) {}
  @Get('')
  async findAll(@Request() req: Request) {
    return this.clientService.http(req);
  }

  @Post()
  create(req: Request) {
    return null; // this.userService.createUserHandler(body);
  }

  // @Post('/login')
  // login(@Body() loginParam: LoginDTO) {
  //   this.userService.loginHandler(loginParam);
  // }

  @Get(':id')
  findOne(req: Request) {
    return null; // this.userService.findOne(id);
  }

  @Put(':id')
  update(req: Request) {
    return null; // this.userService.updateUserHandler(id, updateUserDto);
  }

  @Delete(':id')
  remove(req: Request) {
    return null; // this.userService.deleteUserHandler(id);
  }

  @Put('unblock/:id')
  unblock(req: Request) {
    return null; // this.userService.unblockUserHandle(id);
  }

  //@Post('/auth')
  //cognitoLogin(@Body() login: LoginDTO) {
  //  return this.userService.cognitoLogin(login);
  //}
}

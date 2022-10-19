import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';
import { TransformInterceptor } from '../../../../interceptor/transformReq.interceptor';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

@ApiTags('SSA School')
@Controller('ssa-school')
@UseInterceptors(TransformInterceptor)
@UseGuards(AuthorizationGuard) // comment to bypass authentication for local testing
export class SsaSchoolController implements UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(@Query() body: FindUserDto) {
    return this.userService.findAll(body);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUserHandler(createUserDto);
  }

  // @Post('/login')
  // login(@Body() loginParam: LoginDTO) {
  //   this.userService.loginHandler(loginParam);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserHandler(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUserHandler(id);
  }

  @Put('unblock/:id')
  unblock(@Param('id') id: string) {
    return this.userService.unblockUserHandle(id);
  }

  //@Post('/auth')
  //cognitoLogin(@Body() login: LoginDTO) {
  //  return this.userService.cognitoLogin(login);
  //}
}

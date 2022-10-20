import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  HttpCode,
  Put,
  Headers,
} from '@nestjs/common';
import { Auth0Service } from './auth0.service';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAuth0Dto } from './dto/create-auth0.dto';
import { UpdateAuth0Dto } from './dto/update-auth0.dto';
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';

@ApiTags('Auth0')
@Controller('')
@UseGuards(AuthorizationGuard)
@ApiBearerAuth('token')
@ApiBasicAuth('auth0_api_token')
export class Auth0UserController {
  constructor(private readonly userService: Auth0Service) {}

  @Post()
  @HttpCode(201)
  async post(@Body() createAuth0Dto: CreateAuth0Dto, @Headers() headers: any) {
    const accessToken: string = headers?.api_access_token as string;
    const result = await this.userService.createUserHandler(createAuth0Dto, accessToken);

    if (result.error) {
      throw new HttpException(
        {
          error: result.error,
          message: result.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return result;
    }
  }

  @Get('all')
  async get(@Headers() headers: any) {
    const accessToken: string = headers?.api_access_token as string;
    const result = await this.userService.getUserHandler(accessToken);
    if (result.error) {
      throw new HttpException(
        {
          error: result.error,
          message: result.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  @Post('/apikey')
  async getApiKey() {
    const result = await this.userService.getApiAccessToken();
    if (result.error) {
      throw new HttpException(
        {
          error: result.error,
          message: result.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  @Get(':id')
  async getUserById(@Headers() headers: any, @Param('id') getAuth0Dto: string) {
    const accessToken: string = headers?.api_access_token as string;
    const result = await this.userService.getUserByIdHandler(accessToken, getAuth0Dto);
    if (result.error) {
      throw new HttpException(
        {
          error: result.error,
          message: result.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAuth0Dto: UpdateAuth0Dto, @Headers() headers: any) {
    const accessToken: string = headers?.api_access_token as string;
    const result = await this.userService.updateUserHandler(updateAuth0Dto, id, accessToken);
    if (result.error) {
      throw new HttpException(
        {
          error: result.error,
          message: result.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  @Delete(':id')
  async block(@Param('id') deleteAuthDto: string, @Headers() headers: any) {
    const accessToken: string = headers?.api_access_token as string;
    const result = await this.userService.deleteUserHandler(deleteAuthDto, accessToken);
    if (result.error) {
      throw new HttpException(
        {
          error: result.error,
          message: result.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }
}

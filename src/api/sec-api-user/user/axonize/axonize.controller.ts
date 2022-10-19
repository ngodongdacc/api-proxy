import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  HttpCode,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { AxonizeService } from './axonize.service';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAxonizeDto } from './dto/create-axonize.dto';
import { UpdateAxonizeDto } from './dto/update-axonize.dto';
import { AuthorizationGuard } from '../../../../authorization/authorization.guard';
import { DeleteAxonizeDto } from './dto/delete-axonize.dto';
import { TransformInterceptor } from '../../../../interceptor/transformReq.interceptor';
import { GetApiKeyAxonizeDto } from './dto/api-key-axonize.dto';

@ApiTags('Axonize')
@Controller('')
@UseInterceptors(TransformInterceptor)
@UseGuards(AuthorizationGuard)
@ApiBearerAuth('token')
@ApiBasicAuth('axonize_api_token')
export class AxonizeUserController {
  constructor(private readonly userService: AxonizeService) {}

  @HttpCode(200)
  @Get('/all')
  async getAllUser(@Headers('') headers: any) {
    const accessToken: string = headers?.axonize_api_access_token as string;
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

  @HttpCode(201)
  @Post()
  async createUser(@Body() createAxonizeDto: CreateAxonizeDto, @Headers() headers: any) {
    const accessToken: string = headers?.axonize_api_access_token as string;
    const result = await this.userService.createUserHandler(createAxonizeDto, accessToken);
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
  async getApiKey(@Body() createAxonizeDto: GetApiKeyAxonizeDto) {
    const result = await this.userService.getApiAccessToken(createAxonizeDto);
    if (result.failedLogins) {
      throw new HttpException(
        {
          result,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return result;
  }

  @Get(':id')
  async getUserById(@Headers() headers: any, @Param('id') getAxonizeDto: string) {
    const accessToken: string = headers?.axonize_api_access_token as string;
    const result = await this.userService.getUserByIdHandler(accessToken, getAxonizeDto);
    if (result.error) {
      throw new HttpException(
        {
          error: result.error,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAxonizeDto: UpdateAxonizeDto, @Headers() headers: any) {
    const accessToken: string = headers?.axonize_api_access_token as string;
    const result = await this.userService.updateUserHandler(updateAxonizeDto, id, accessToken);
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
  async deleteUserById(@Param('id') deleteAxonizeDto: DeleteAxonizeDto, @Headers() headers: any) {
    const accessToken: string = headers?.axonize_api_access_token as string;
    const result = await this.userService.deleteUserByIdHandler(deleteAxonizeDto, accessToken);
    if (result.error) {
      throw new HttpException(
        {
          error: result.error,
          message: result.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  @Post('resetPassword/:id')
  async resetUserPassword(@Param('id') id: string, @Headers() headers: any) {
    const accessToken: string = headers?.axonize_api_access_token as string;
    const result = await this.userService.resetPasswordHandler(id, accessToken);
    if (result.error) {
      throw new HttpException(
        {
          error: result.error,
          message: result.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}

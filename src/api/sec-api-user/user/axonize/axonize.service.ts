/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { CreateAxonizeDto, UserRoleId } from './dto/create-axonize.dto';
import { UpdateAxonizeDto } from './dto/update-axonize.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { DeleteAxonizeDto } from './dto/delete-axonize.dto';
import { GetApiKeyAxonizeDto } from './dto/api-key-axonize.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserResponse, GetUserResponse } from './dto/response.dto';
import { axiosConfig } from '../../../../helpers/utils';
require('dotenv').config();

@Injectable()
export class AxonizeService {
  constructor(private readonly httpService: HttpService) {}

  async getUserHandler(accessToken: string) {
    const config = axiosConfig({ accessToken, method: 'get', url: process.env.AXONIZE_API_URL });

    try {
      let result = await axios(config);
      result = result.data.value.map((user) => user);

      return plainToInstance(GetUserResponse, result);
    } catch (error) {
      return error.response.data;
    }
  }

  async getUserByIdHandler(accessToken: string, getAxonizeDto: string) {
    const config = axiosConfig({ accessToken, method: 'get', url: `${process.env.AXONIZE_API_URL}/${getAxonizeDto}` });

    try {
      const result = await axios(config);

      return plainToInstance(GetUserResponse, result.data);
    } catch (error) {
      return {
        error: 'User not found',
      };
    }
  }

  async createUserHandler(CreateAxonizeDto: CreateAxonizeDto, accessToken: string): Promise<any> {
    let userRoleId = null;
    if (CreateAxonizeDto.role == 'admin') {
      userRoleId = UserRoleId.ADMIN;
    } else if (CreateAxonizeDto.role == 'user') {
      userRoleId = UserRoleId.USER;
    }
    const axonieBody = {
      email: CreateAxonizeDto.email,
      username: CreateAxonizeDto.username,
      tenantId: process.env.AXONIZE_TENANT_ID,
      status: CreateAxonizeDto.status,
      role: CreateAxonizeDto.role,
      roleId: userRoleId,
      password: CreateAxonizeDto.password,
    };

    const config = axiosConfig({ accessToken, method: 'post', url: process.env.AXONIZE_API_URL, data: axonieBody });

    try {
      const result = await axios(config);

      return plainToInstance(CreateUserResponse, result.data);
    } catch (error) {
      return error.response.data;
    }
  }

  async updateUserHandler(UpdateAxonizeDto: UpdateAxonizeDto, id: string, accessToken: string): Promise<any> {
    let userRoleId = null;
    if (UpdateAxonizeDto.role == 'admin') {
      userRoleId = UserRoleId.ADMIN;
    } else if (UpdateAxonizeDto.role == 'user') {
      userRoleId = UserRoleId.USER;
    }
    const axonizeData = {
      username: UpdateAxonizeDto.username,
      status: UpdateAxonizeDto.status,
      role: UpdateAxonizeDto.role,
      roleId: userRoleId,
    };

    const updateConfig = axiosConfig({
      accessToken,
      method: 'patch',
      url: `${process.env.AXONIZE_API_URL}/${id}`,
      data: axonizeData,
    });

    try {
      const update = await axios(updateConfig);
      if (update.status == 204) {
        return { msg: 'User updated' };
      }
    } catch (error) {
      if (error.response.status == 404) {
        return { error: 'User not found' };
      } else {
        return error.response.data;
      }
    }
  }

  async resetPasswordHandler(id: string, accessToken: string): Promise<any> {
    const data = {
      userId: id,
      url: process.env.AXONIZE_CLP_URL,
    };

    const config = axiosConfig({
      accessToken,
      method: 'post',
      url: `${process.env.AXONIZE_API_URL}/resetPassword`,
      data: data,
    });

    try {
      const result = await axios(config);
      if (result.status == 200) {
        return { msg: 'Requested to reset user password' };
      }
    } catch (error) {
      if (error.response.status == 404) {
        return { error: 'User not found' };
      } else {
        return error.response.data;
      }
    }
  }

  async deleteUserByIdHandler(DeleteAxonizeDto: DeleteAxonizeDto, accessToken: string) {
    const config = axiosConfig({
      accessToken,
      method: 'delete',
      url: `${process.env.AXONIZE_API_URL}/${DeleteAxonizeDto}`,
    });

    try {
      const result = await axios(config);
      if (result.status == 200) {
        return { msg: 'User deleted' };
      }
    } catch (error) {
      if (error.response.status == 404) {
        return { error: 'User not found' };
      } else {
        return error.response.data;
      }
    }
  }

  async getApiAccessToken(CreateAxonizeDto: GetApiKeyAxonizeDto): Promise<any> {
    const params = new URLSearchParams();
    params.append('Email', CreateAxonizeDto.email);
    params.append('Password', CreateAxonizeDto.password);
    params.append('url', process.env.AXONIZE_OFFICE_URL);
    const response = await fetch(process.env.AXONIZE_LOGIN_URL, {
      method: 'POST',
      body: params,
    });
    try {
      const json = await response.json();
      if (json.token) {
        return {
          token: json.token,
          name: json.name,
        };
      } else return json;
    } catch (error) {
      return error.response.data;
    }
  }
}

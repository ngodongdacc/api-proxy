/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { CreateAuth0Dto } from './dto/create-auth0.dto';
import { UpdateAuth0Dto } from './dto/update-auth0.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { plainToInstance } from 'class-transformer';
import { GetUserResponse } from './dto/response.dto';
import { axiosConfig } from '../../../../helpers/utils';
require('dotenv').config();

@Injectable()
export class Auth0Service {
  constructor(private readonly httpService: HttpService) {}
  url = `${process.env.AUTH0_AUDIENCE}users`;
  async getUserHandler(accessToken: string) {
    const config = axiosConfig({ accessToken });

    try {
      let { data } = await firstValueFrom(this.httpService.get(this.url, config));
      data = data.map((user) => {
        user.blocked = !!user.blocked;
        return user;
      });

      return plainToInstance(GetUserResponse, data);
    } catch (error) {
      return error.response.data;
    }
  }

  async getUserByIdHandler(accessToken: string, getAuth0Dto: string) {
    const config = axiosConfig({ accessToken });

    try {
      const { data } = await firstValueFrom(this.httpService.get(`${this.url}/${getAuth0Dto}`, config));

      return plainToInstance(GetUserResponse, data);
    } catch (error) {
      return error.response.data;
    }
  }

  async createUserHandler(CreateAuth0Dto: CreateAuth0Dto, accessToken: string): Promise<any> {
    const auth0Body = {
      email: CreateAuth0Dto.email,
      name: CreateAuth0Dto.first_name,
      given_name: CreateAuth0Dto.first_name,
      family_name: CreateAuth0Dto.last_name,
      email_verified: false,
      connection: process.env.AUTH0_CONNECTION,
      password: CreateAuth0Dto.password,
    };

    const config = axiosConfig({ accessToken, method: 'post', url: this.url, data: auth0Body });

    try {
      const result = await axios(config);
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async updateUserHandler(UpdateAuth0Dto: UpdateAuth0Dto, id: string, accessToken: string): Promise<any> {
    const auth0Body = {
      email: UpdateAuth0Dto.email,
      name: UpdateAuth0Dto.user_name,
      given_name: UpdateAuth0Dto.first_name,
      family_name: UpdateAuth0Dto.last_name,
      user_metadata: {
        given_name: UpdateAuth0Dto.first_name,
        family_name: UpdateAuth0Dto.last_name,
      },
      connection: process.env.AUTH0_CONNECTION,
      client_id: process.env.AUTH0_CLIENT_ID,
      password: UpdateAuth0Dto.password,
      blocked: UpdateAuth0Dto.blocked,
    };

    const updateConfig = axiosConfig({ accessToken, method: 'patch', url: `${this.url}/${id}`, data: auth0Body });

    try {
      const update = await axios(updateConfig);
      return {
        ...update.data,
      };
    } catch (error) {
      return error.response.data;
    }
  }

  async deleteUserHandler(deleteAuthDto: string, accessToken: string): Promise<any> {
    const data = {
      blocked: true,
    };

    const config = axiosConfig({ accessToken, method: 'patch', url: `${this.url}/${deleteAuthDto}`, data: data });

    try {
      await this.getUserByIdHandler(accessToken, deleteAuthDto);
      const result = await axios(config);
      if (result.data) {
        return {
          msg: 'User blocked',
        };
      } else {
        return {
          result,
        };
      }
    } catch (error) {
      return error.response.data;
    }
  }

  async getApiAccessToken(): Promise<any> {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.AUTH0_API_CLIENT_ID);
    params.append('client_secret', process.env.AUTH0_API_CLIENT_SECRET);
    params.append('audience', process.env.AUTH0_AUDIENCE);
    const response = await fetch(process.env.AUTH0_TOKEN_URL, {
      method: 'POST',
      body: params,
    });
    const json = await response.json();
    try {
      return {
        accessToken: json?.access_token,
        tokenType: json?.token_type,
        expiresIn: json?.expires_in,
      };
    } catch (error) {
      return error.response.data;
    }
  }
}

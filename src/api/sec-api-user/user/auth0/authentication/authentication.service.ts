/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { Auth0Service } from '../auth0.service';
import { LoginAuth0 } from '../dto/login-auth0.dto';
require('dotenv').config();
@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: Auth0Service) {}
  url = `${process.env.AUTH0_AUDIENCE}users`;
  async loginUserHandler(req: LoginAuth0): Promise<any> {
    const email = req.email;
    const password = req.password;
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', email);
    params.append('password', password);
    params.append('client_id', process.env.AUTH0_CLIENT_ID);
    params.append('client_secret', process.env.AUTH0_CLIENT_SECRET);
    params.append('audience', process.env.AUTH0_AUDIENCE);
    try {
      const response = await fetch(process.env.AUTH0_TOKEN_URL, {
        method: 'POST',
        body: params,
      });

      const json = await response.json();
      if (!json.error) {
        const userData = await this.getUserByEmail(email);
        return {
          accessToken: json.access_token,
          expriesIn: json.expires_in,
          tokenType: json.token_type,
          email: userData.data[0].email,
          firstName: userData.data[0].given_name,
        };
      } else return json;
    } catch (error) {
      return error.response.data;
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    const apiKey = await this.userService.getApiAccessToken();
    const config = {
      method: 'get',
      url: `${process.env.AUTH0_AUDIENCE}users-by-email?email=${email}`,
      headers: {
        Authorization: `Bearer ${apiKey.accessToken}`,
      },
    };
    try {
      const result = await axios(config);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

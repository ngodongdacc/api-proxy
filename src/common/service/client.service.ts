import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import configuration from '../../config/configuration';

export function ClientService(url: any) {
  // @ObjectType({ isAbstract: true })
  @Injectable()
  abstract class Http {
    public timeout: number;
    public readonly logger = new Logger(ClientService.name);
    constructor() {
      this.timeout = 120000;
    }

    public validateStatus(status) {
      return status >= 200 && status < 600; // forward error code and message to client
    }

    // customized axios request
    public async request(req: Request) {
      try {
        const headers = {
          Authorization: req.headers['authorization'] || undefined,
          'Content-Type': req.headers['Content-Type'] || 'application/json',
        };
        const config: AxiosRequestConfig = {
          url: url + req.url,
          method: req.method || 'get',
          data: req.body,
          headers,
          timeout: this.timeout,
        };
        const response = await axios.request({
          ...config,
          validateStatus: (status) => status >= 200 && status < 600,
          timeout: this.timeout,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
  return Http;
}
// @Injectable()
// export class ClientUserService extends ClientService('url') {}

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import * as FormData from 'form-data';
import secApiUserConfiguration from '../../api/sec-api-user/config/configuration';

// import secApiUserConfiguration from '../api/sec-api-user/config/configuration';
export function ClientService(url: any) {
  // @ObjectType({ isAbstract: true })
  @Injectable()
  abstract class Http {
    public timeout: number;
    public readonly logger = new Logger(ClientService.name);
    constructor() {
      this.timeout = 120000;
    }
    get(config: AxiosRequestConfig) {
      return this.request({ ...config, method: 'get' });
    }

    post(config: AxiosRequestConfig) {
      return this.request({ ...config, method: 'post' });
    }

    put(config: AxiosRequestConfig) {
      return this.request({ ...config, method: 'put' });
    }

    patch(config: AxiosRequestConfig) {
      return this.request({ ...config, method: 'patch' });
    }

    delete(config: AxiosRequestConfig) {
      return this.request({ ...config, method: 'delete' });
    }

    public validateStatus(status) {
      return status >= 200 && status < 600; // forward error code and message to client
    }

    // customized axios request
    public async request(config: AxiosRequestConfig) {
      try {
        const response = await axios.request({
          ...config,
          validateStatus: this.validateStatus,
          timeout: this.timeout,
        });
        return response.data;
      } catch (error) {
        this.handleAxiosError(error);
        throw error;
      }
    }
    public async http(req: Request) {
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
        }
        console.log('config:: ', config);

        const response = await axios.request({
          ...config,
          validateStatus: this.validateStatus,
          timeout: this.timeout,
        });
        return response.data;
      } catch (error) {
        this.handleAxiosError(error);
        throw error;
      }
    }

    async postFileFormData(url: string, file: any, params?: any, token?: string) {
      try {
        const data = new FormData();
        if (params) {
          const parseParams = Object.keys(params).map((key) => [
            { key, value: params[key] },
          ]);
          if (parseParams.length) {
            for (const param of parseParams) {
              if (param.length) {
                for (const item of param) {
                  data.append(item.key, item.value);
                }
              }
            }
          }
        }
        data.append('file', file.buffer, file.originalname);

        const config: any = {
          method: 'post',
          url,
          headers: {
            Authorization: `Bearer ${token}`,
            ...data.getHeaders(),
          },
          validateStatus: this.validateStatus,
          timeout: this.timeout,
          data,
        };

        const result: any = await axios.request(config);
        if (result.data.status) {
          return {
            error: null,
            data: result.data,
          };
        }
        return {
          error: null,
          data: {
            fileResponse: result.data,
            fileName: result.headers['content-disposition'].split('filename=')[1],
          },
        };
      } catch (error) {
        this.handleAxiosError(error);
        return { error: error.message, data: null };
      }
    }

    // https://github.com/axios/axios#handling-errors
    handleAxiosError({ message, config, response }) {
      const logError: any = { message, config };
      if (response) {
        logError.response = {
          status: response.status,
          headers: response.headers,
          data: response.data,
        };
      }
      this.logger.error(JSON.stringify(logError));
    }

    async postFileFormDataWithStream(
      url: string,
      file: any,
      params?: any,
      method?: any,
      token?: string,
    ) {
      try {
        const data = new FormData();
        // Team core request call api with file is optional (EX: promotion/offer/upload/upload-csv)
        if (file) data.append('file', file.buffer, file.originalname);

        if (params) {
          const parseParams = Object.keys(params).map((key) => [
            { key, value: params[key] },
          ]);
          if (parseParams.length) {
            for (const param of parseParams) {
              if (param.length) {
                for (const item of param) {
                  data.append(item.key, item.value);
                }
              }
            }
          }
        }

        const config: any = {
          method: method || 'post',
          url,
          headers: {
            Authorization: `Bearer ${token}`,
            ...data.getHeaders(),
          },
          validateStatus: this.validateStatus,
          timeout: this.timeout,
          data,
        };

        const result: any = await axios.request(config);
        if (result.data.status) {
          return {
            error: null,
            data: result.data,
          };
        }
        return {
          error: null,
          data: {
            fileResponse: result.data,
            fileName: result.headers['content-disposition'].split('filename=')[1],
          },
        };
      } catch (error) {
        this.handleAxiosError(error);
        return { error: error.message, data: null };
      }
    }
  }
  return Http;
}

@Injectable()
class URL {
  public uri: string;
  constructor() {
    const configService = new ConfigService({ app: secApiUserConfiguration });
    this.uri = configService.get('app')().sec_user.api;
  }
}
const url = new URL();
@Injectable()
export class Http extends ClientService(url.uri) {}

import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);
  private timeout: number;

  constructor() {
    this.timeout = 120000;
  }

  get(url: string, params?: any, token?: string) {
    return this.request({ method: 'get', url, params }, token);
  }

  post(url: string, data?: any, token?: string) {
    return this.request({ method: 'post', url, data }, token);
  }

  put(url: string, data?: any, token?: string) {
    return this.request({ method: 'put', url, data }, token);
  }

  patch(url: string, data?: any, token?: string) {
    return this.request({ method: 'patch', url, data }, token);
  }

  delete(url: string, data?: any, token?: string) {
    return this.request({ method: 'delete', url, data }, token);
  }

  private validateStatus(status) {
    return status >= 200 && status < 600; // forward error code and message to client
  }

  // customized axios request
  private async request(config: AxiosRequestConfig, token?: string) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.request({
        ...config,
        headers,
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

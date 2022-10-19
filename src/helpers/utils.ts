export interface IAxiosConfig {
  accessToken: string;
  method?: string;
  url?: string;
  data?: any;
}

export const axiosConfig = (httpInput: IAxiosConfig) => {
  const { accessToken, method, url, data } = httpInput;
  const config: any = {
    headers: {
      Authorization: `${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  if (method) config.method = method;

  if (url) config.url = url;

  if (data) config.data = data;

  return config;
};

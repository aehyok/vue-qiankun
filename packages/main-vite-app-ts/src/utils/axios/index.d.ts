import { AxiosRequestConfig, AxiosResponse } from "axios"

export interface RequestProxyType {
  get(
    url: string,
    config?: AxiosRequestConfig,
    customConfig?: CustomConfigType
  ): Promise<AxiosResponse>;

  post(
    url: string,
    config?: AxiosRequestConfig,
    customConfig?: CustomConfigType
  ): Promise<AxiosResponse>;

  delete(
    url: string,
    config?: AxiosRequestConfig,
    customConfig?: CustomConfigType
  ): Promise<AxiosResponse>;

  put(
    url: string,
    config?: AxiosRequestConfig,
    customConfig?: CustomConfigType
  ): Promise<AxiosResponse>;
}

export interface CustomConfigType {
  isNeedToken?: boolean;
  isNeedLoading?: boolean;
  isNeedShowError?: boolean;
}

export interface RequestType {
  request(config: AxiosRequestConfig): Promise<AxiosResponse>;
}
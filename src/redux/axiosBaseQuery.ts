import { axiosInstance } from "@/lib/axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";


const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      console.log('AxiosBaseQuery - Request:', { url, method, data, params, headers });
      const result = await axiosInstance({
        url: url,
        method,
        data,
        params,
        headers,
      });
      //console.log('AxiosBaseQuery - Response:', result.data);
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      //console.error('AxiosBaseQuery - Error:', err.response?.data);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
/**
 * axios封装
 */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "./apiUtils";
import { setPreLocation } from "./preLocationUtils";
import { clearToken, getToken } from "./tokenUtils";
import history from "./history";
import { AsyncCallback } from "../models/common";

const YSAxios = axios.create({ baseURL: BASE_URL ,withCredentials:true});
// Response成功的拦截器，用于处理返回数据
const onFullFilled = (response: AxiosResponse): AxiosResponse => response;

// Response失败的拦截器，用于错误处理
const onRejected = (err: any): Promise<void> => {
  console.error("NETWORK REJECTED: ", `${err}`);
  if (err.response && err.response.data && err.response.data.code) {
    const { code, message } = err.response.data;
    err.message = `错误 ${code}: ${message || "Unknown"}`;
  }
  if (err.response) {
    switch (err.response.status) {
      case 401:
      case 502:
        clearAndBackLogin();
        return new Promise(() => {});
      default:
        break;
    }
  }
  return Promise.reject(err);
};

// Request拦截器
const requestOnFullFilled = (
  request: AxiosRequestConfig
): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  const token = getToken();
  if(request.url=="login"){
    return Object.assign(request, {
      headers: { ...request.headers, Authorization: "666" },
    });
  }
  if (token) {
    return Object.assign(request, {
      headers: { ...request.headers, Authorization: token },
    });
  }
  clearAndBackLogin();
  return new Promise(() => {});
};

YSAxios.interceptors.request.use(requestOnFullFilled);
YSAxios.interceptors.response.use(onFullFilled, onRejected);

const clearAndBackLogin = () => {
  clearToken();
  setPreLocation();
  history.push("/login");
};

export default YSAxios;

export const isOk = (response: AxiosResponse) =>
  response && response.status >= 200 && response.status < 300;

export const callback = (
  response: AxiosResponse,
  cb: AsyncCallback,
  defaultValue?: any
) => cb({ isOk: isOk(response), data: response?.data || defaultValue });

import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { useUserStoreHook } from "@/store/modules/user";
import { getToken } from "./cache/cookies";
import NProgress from "nprogress";
import type { BaseResponse } from "/types/api";
import { showFailToast } from "vant";

/** 退出登录并强制刷新页面（会重定向到登录页） */
const logout = () => {
  useUserStoreHook().logout();
  location.reload();
};

/** 创建请求实例 */
function createService() {
  // 创建一个 axios 实例命名为 request
  const request: AxiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json"
    },
    timeout: 10000,
    baseURL: import.meta.env.VITE_BASE_API
  });

  // 请求拦截
  request.interceptors.request.use(
    (config) => {
      NProgress.start();
      config.headers.PanToken = getToken() || undefined;
      return config;
    },
    // 发送失败
    (error) => Promise.reject(error)
  );

  // 响应拦截（可根据具体业务作出相应的调整）
  request.interceptors.response.use(
    (response: AxiosResponse<any, BaseResponse<any>>): any => {
      NProgress.done();

      // apiData 是 api 返回的数据
      const respData: BaseResponse<any> = response.data;

      if (!respData) {
        showFailToast("返回值异常");
        return Promise.reject(new Error("返回值异常"));
      }

      // 二进制数据则直接返回
      const responseType = response.request?.responseType;
      if (responseType === "blob" || responseType === "arraybuffer") return respData;

      // 这个 code 是和后端约定的业务 code
      const code = respData.code;
      // 如果没有 code, 代表这不是项目后端开发的 api
      if (code === undefined) {
        showFailToast("返回code异常");
        return Promise.reject(new Error("返回code异常"));
      }

      if (code !== 20000) {
        showFailToast(respData.msg);
        return Promise.reject(new Error(respData.msg));
      }

      return respData;
    },
    (error) => {
      NProgress.done();
      // status 是 HTTP 状态码
      const status: number = error.response?.status || -1;

      switch (status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          // Token 过期时
          logout()
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求地址出错";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP 版本不受支持";
          break;
        default:
          break;
      }

      showFailToast(error.message);
      return Promise.reject(error);
    }
  );

  return request;
}

const request = createService();
export default request;

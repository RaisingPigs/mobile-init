//统一管理项目用户相关的接口
import request from "@/utils/request";

import type { LoginForm, UserVO } from "./type";

import type { BaseResponse } from "/types/api";

//项目用户相关的请求地址
enum URL {
  LOGIN = "/user/login",
  GET_LOGIN_USER = "/user/info",
  LOGOUT = "/user/logout"
}

//登录接口
export const reqLogin = (data: LoginForm) => request.post<LoginForm, BaseResponse<string>>(URL.LOGIN, data);

//获取用户信息
export const reqLoginUser = () => request.get<any, BaseResponse<UserVO>>(URL.GET_LOGIN_USER);

//退出登录
export const reqLogout = () => request.post<any, any>(URL.LOGOUT);

import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from "@/utils/cache/cookies";
import type { LoginForm, UserVO } from "@/api/login/type";
import { reqLogin, reqLoginUser, reqLogout } from "@/api/login";
import type { BaseResponse } from "/types/api";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const roles = ref<string[]>([]);
  const loginUser = ref<UserVO>();

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value;
  };

  /** 登录 */
  const login = async (loginForm: LoginForm) => {
    const res: BaseResponse<string> = await reqLogin(loginForm);
    setToken(res.data);
    token.value = res.data;
  };

  /** 获取用户详情 */
  const getLoginUser = async () => {
    const { data } = await reqLoginUser();
    loginUser.value = data;

    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = [data.role];
  };


  /** 登出 */
  const logout = async () => {
    await reqLogout();
    resetToken();
    // resetRouter()
    // _resetTagsView()
  };

  /** 重置 Token */
  const resetToken = () => {
    removeToken();
    token.value = "";
    roles.value = [];
    loginUser.value = undefined;
  };


  return { token, loginUser, roles, setRoles, login, getLoginUser, logout, resetToken };
});

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store);
}

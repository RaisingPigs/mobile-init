<template>
  <div class="tools-content pt-[20px] px-[12px]">
    <div class="pl-[12px] border-l-[3px] border-[color:#41b883] mb-[12px]">
      <h3 class="font-bold text-[18px] my-[4px]">Mock</h3>
    </div>
    <van-space>
      <van-button type="success" @click="handleLogin">登录</van-button>
      <van-button type="danger" @click="handleGetLoginUser"
        >获取信息</van-button
      >
      <van-button type="danger" @click="handleLogout">退出</van-button>
    </van-space>
    <div
      class="text-[14px] py-[2px] px-[10px] rounded-[4px] bg-[var(--color-block-background)] mt-[14px]"
    >
      <div>
        {{ useUserStoreHook().loginUser }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Tools">
// import { showFailToast, showSuccessToast } from "vant";
import "vant/es/toast/style";
import { useUserStoreHook } from "@/store/modules/user";

const handleLogin = async () => {
  await useUserStoreHook().login({
    username: "admin",
    password: "admin"
  });

  console.log(useUserStoreHook().loginUser);
};

const handleLogout = async () => {
  await useUserStoreHook().logout();
  console.log(useUserStoreHook().loginUser);
};

const handleGetLoginUser = async () => {
  await useUserStoreHook().getLoginUser();
  console.log(useUserStoreHook().loginUser);
};
</script>

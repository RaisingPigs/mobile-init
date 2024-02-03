<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const active = ref(0);
const tabbarData = ref<TabbarData[]>([]);

import routes from "@/router/routes";
import type { RouteRecordRaw } from "vue-router";

interface TabbarData {
  icon: string;
  title: string;
  to: {
    name: string;
  };
}

const getTabbarData = () => {
  if (!routes || routes.length === 0) {
    return;
  }

  tabbarData.value = routes[0].children?.map((route: RouteRecordRaw) =>
    route2TabbarData(route)
  ) as TabbarData[];
};

const route2TabbarData = (route: RouteRecordRaw): TabbarData => {
  return {
    icon: route.meta?.icon as string,
    title: route.meta?.title as string,
    to: {
      name: route.name as string
    }
  };
};

onMounted(() => {
  getTabbarData();
});
</script>

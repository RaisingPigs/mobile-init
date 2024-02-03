import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Demo from "@/views/demo/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Demo" },
    children: [
      {
        path: "demo",
        name: "Demo",
        component: Demo,
        meta: {
          title: "主页",
          icon: "wap-home-o"
        }
      },
      {
        path: "tools",
        name: "Tools",
        component: () => import("@/views/tools/index.vue"),
        meta: {
          title: "工具",
          icon: "gem-o"
        }
      },
      {
        path: "pantest",
        name: "PanTest",
        component: () => import("@/views/pantest/index.vue"),
        meta: {
          title: "测试",
          icon: "wap-home-o"
        }
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "关于",
          icon: "user-o",
          noCache: true
        }
      }
    ]
  }
];

export default routes;

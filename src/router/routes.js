import Layout from "@/layout/index.vue";
import Demo from "@/views/demo/index.vue";

const routes = [
  {
    path: "/",
    name: "pay",
    component: Layout,
    redirect: "/pay/error",
    children: [
      {
        path: "/pay/checkout/:id",
        name: "checkout",
        component: Demo,
        meta: {
          title: "主页"
        }
      },
      {
        path: "tools",
        name: "Tools",
        component: () => import("@/views/tools/index.vue"),
        meta: {
          title: "工具"
        }
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "关于",
          noCache: true
        }
      },
      {
        path: "/pay/expired",
        name: "pay/expired",
        component: () => import("@/views/404.vue"),
      },
      {
        path: "/pay/error",
        name: "pay/error",
        component: () => import("@/views/error.vue"),
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/pay/error"
  }
];

export default routes;

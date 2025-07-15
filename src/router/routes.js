import Layout from "@/layout/index.vue";
import Demo from "@/views/demo/index.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "index" },
    children: [
      {
        path: "index/:id",
        name: "index",
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
        path: "404",
        name: "404",
        component: () => import("@/views/error.vue"),
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
];

export default routes;

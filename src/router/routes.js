import Layout from "@/layout/index.vue";
import Demo from "@/views/demo/index.vue";

const routes = [
  {
    path: "/",
    name: "pay",
    component: Layout,
    redirect: "pay/error",
    children: [
      {
        path: "pay/checkout/:id",
        name: "checkout",
        component: Demo,
        meta: {
          title: "主页"
        }
      },
      {
        path: "pay/expired",
        name: "pay/expired",
        component: () => import("@/views/404.vue"),
      },
      {
        path: "pay/error",
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

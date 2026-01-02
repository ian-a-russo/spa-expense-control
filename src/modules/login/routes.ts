import type { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("./auth/Index.vue"),
  },
  {
    path: "/register",
    component: () => import("./register/Index.vue"),
  },
  {
    path: "/redefine-password",
    component: () => import("./redefine-password/Index.vue"),
  },
];

export default route;

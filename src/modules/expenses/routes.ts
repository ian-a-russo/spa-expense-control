import type { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw[] = [
  {
    path: "/expenses",
    component: () => import("@/modules/expenses/Index.vue"),
    meta: { requiresAuth: true, roles: ["admin"] },
  },
];

export default route;

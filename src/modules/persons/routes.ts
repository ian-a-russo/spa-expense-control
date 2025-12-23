import type { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw[] = [
  {
    path: "/persons",
    component: () => import("@/modules/persons/Index.vue"),
    meta: { requiresAuth: true, roles: ["admin"] },
  },
];

export default route;

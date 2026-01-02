import type { RouteRecordRaw } from "vue-router";

import login from "../modules/login/routes";

export const loginModule: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
    children: [...login],
  },
];

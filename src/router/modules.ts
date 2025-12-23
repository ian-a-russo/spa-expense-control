import type { RouteRecordRaw } from "vue-router";
import expenses from "@/modules/expenses/routes";
import persons from "@/modules/persons/routes";

export const modules: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/expenses",
    component: () => import("@/layouts/desktop/Index.vue"),
    children: [...expenses, ...persons],
  },
];

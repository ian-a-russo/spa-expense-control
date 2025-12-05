/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables

// import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from "vue-router";
import { modules } from "./modules";
import { userSessionStore } from "../stores/user-session-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...modules],
});

router.beforeEach((to, from, next) => {
  // const isAuthenticated = !!userSessionStore.token;
  // const requiresAuth = to.meta.requiresAuth as boolean | undefined;
  // const allowedRoles = to.meta.roles as string[] | undefined;

  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next({ path: "/login" });
  // } else if (
  //   allowedRoles?.length &&
  //   !allowedRoles.includes(userSessionStore.user.role)
  // ) {
  //   next({ path: "/catalog" });
  // } else {
  next();
  // }
});

export default router;

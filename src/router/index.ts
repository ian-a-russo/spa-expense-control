/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables

// import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from "vue-router";
import { modules } from "./modules";
import { loginModule } from "./login.module";
import { userSessionStore } from "../stores/user-session-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...modules, ...loginModule],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!userSessionStore.token;
  const allowedRoles = to.meta.roles as string[] | undefined;

  if (to.meta.requiresAuth && !isAuthenticated) {
    if (to.path !== "/login") {
      return next({ path: "/login" });
    }
    return next();
  }

  if (
    allowedRoles?.length &&
    !allowedRoles.includes(userSessionStore.user.role)
  ) {
    if (to.path !== "/expenses") {
      return next({ path: "/expenses" });
    }
    return next();
  }

  next();
});

export default router;

<template>
  <div v-for="(navigation, index) in props.navigations" :key="index">
    <v-list-item
      :active="isActive(navigation.to)"
      :to="navigation.to"
      rounded="xl"
      class="nav-item"
    >
      <template #prepend>
        <v-icon class="nav-icon" :size="navigation.iconSize || '26'">
          {{ navigation.icon }}
        </v-icon>
      </template>

      <template #title>
        <span
          class="nav-title"
          :style="{
            fontSize: navigation.fontSize ? navigation.fontSize : '16px',
          }"
        >
          {{ navigation.title }}
        </span>
      </template>
    </v-list-item>
  </div>
</template>

<script lang="ts" setup>
import { userSessionStore } from "@/stores/user-session-store";

export type TNavigation = {
  title: string;
  icon: string;
  to?: string;
  childs?: TNavigation[];
  fontSize?: string;
  iconSize?: string;
};

const props = defineProps<{
  navigations: TNavigation[];
}>();
const adminPhoneNumber = import.meta.env.VITE_ADMIN_PHONE_NUMBER;

const route = useRoute();

function isActive(to?: string) {
  if (!to) return false;
  return route.path.startsWith(to);
}

function logout() {
  userSessionStore.logout();
  window.location.reload();
}
</script>

<style scoped>
/* Item principal */
.nav-item {
  margin-right: 6px;
  margin-bottom: 6px;
  padding: 8px 14px;
  transition: 0.25s ease;
  border-radius: 12px;
}

/* Ícone */
.nav-icon {
  margin-right: 10px;
  color: rgba(var(--v-theme-primary));
  transition: color 0.25s ease;
}

/* Texto */
.nav-title {
  font-family: "Quicksand", sans-serif;
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface), 0.85);
  transition: color 0.25s ease;
}

/* ACTIVE STATE — mais elegante */
.v-list-item--active {
  background: rgba(var(--v-theme-primary), 0.12) !important;
}

.v-list-item--active .nav-title {
  color: rgba(var(--v-theme-primary)) !important;
}

.v-list-item--active .nav-icon {
  color: rgba(var(--v-theme-primary)) !important;
}

/* HOVER STATE */
.nav-item:hover {
  background: rgba(var(--v-theme-primary), 0.08);
}

.nav-item:hover .nav-title {
  color: rgba(var(--v-theme-primary));
}

.nav-item:hover .nav-icon {
  color: rgba(var(--v-theme-primary));
}
</style>

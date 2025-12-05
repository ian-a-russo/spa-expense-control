<template>
  <div v-for="(navigation, index) in props.navigations" :key="index">
    <v-list-item
      :active="isActive(navigation.to)"
      rounded="lg"
      class="mr-2 mb-2 rounded-right-xl"
      :to="navigation.to"
    >
      <template #title>
        <div class="d-flex align-center">
          <v-icon
            class="mx-2"
            :style="{
              font: navigation.iconSize
                ? navigation.iconSize + ' Quicksand, sans-serif'
                : '30px Quicksand, sans-serif',
            }"
          >
            {{ navigation.icon }}
          </v-icon>
          <span
            class="mx-2"
            :style="{
              font: navigation.fontSize
                ? navigation.fontSize + ' Quicksand, sans-serif'
                : '16px Quicksand, sans-serif',
            }"
          >
            {{ navigation.title }}
          </span>
        </div>
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
.v-list-item.v-list-item--active {
  color: rgba(var(--v-theme-font)) !important;
  opacity: 1 !important;
}

.v-list-item:hover {
  transition: all 0.4s ease-in-out;
  color: rgba(var(--v-theme-font)) !important;
  opacity: 1 !important;
}
</style>

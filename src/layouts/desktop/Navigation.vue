<template>
  <v-navigation-drawer
    style="position: fixed"
    width="260"
    elevation="0"
    class="modern-drawer border-e-md border-line-border"
  >
    <div class="drawer-header text-center py-8">
      <v-icon size="72" color="primary">
        streamline-freehand:money-atm-withdraw
      </v-icon>

      <p class="text-h5 mt-3 font-weight-bold text-primary">Expense</p>
      <p class="text-subtitle-2 text-primary-darken-1">Control</p>
    </div>

    <v-list color="transparent" class="px-3">
      <NavigationList :navigations="navigations" />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import NavigationList from "./NavigationList.vue";
import { userSessionStore } from "@/stores/user-session-store";

const user = userSessionStore.user;
const userInitials = ref<string>();

function getInitials() {
  const name = (user?.name as string).split(" ")[0];

  userInitials.value = name[0]?.toUpperCase();
}

onMounted(() => {
  getInitials();
});

const navigations = computed(() => [
  {
    title: "Compras",
    icon: "streamline-freehand:money-coin-cash",
    to: "/expenses",
  },
  {
    title: "Pessoas",
    icon: "streamline-freehand:business-management-agreement",
    to: "/persons",
  },
]);
</script>

<style scoped>
.modern-drawer {
  background: linear-gradient(
    180deg,
    rgb(var(--v-theme-surface)) 0%,
    rgb(var(--v-theme-background)) 100%
  );
}

.drawer-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}

.user-box {
  background: rgba(0, 0, 0, 0.04);
  transition: 0.2s ease;
}

.user-box:hover {
  background: rgba(0, 0, 0, 0.07);
}
</style>

<template>
  <v-navigation-drawer
    style="position: fixed"
    elevation="0"
    class="modern-gradient-background border-e-md border-line-border"
  >
    <div class="mt-5 text-center pa-5">
      <!-- <v-img :src="`/logo.png`" cover /> -->
      <v-icon size="70%" color="primary-lighten-1">
        streamline-freehand:money-atm-withdraw
      </v-icon>
      <br />
      <p class="text-h4 font-weight-bold text-primary">Expense</p>
      <p class="font-weight-bold text-primary-darken-1">Control</p>
    </div>

    <v-list color="transparent">
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
    title: "Gastos",
    icon: "streamline-freehand:money-coin-cash",
    to: "/expenses",
  },
]);
</script>

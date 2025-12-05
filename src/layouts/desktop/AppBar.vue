<template>
  <v-app-bar
    v-show="showAppBar"
    elevation="0"
    style="position: fixed"
    class="transition-all duration-300"
    color="transparent"
  >
    <v-btn icon rounded="xl" @click="toggleNavigation">
      <v-icon color="primary-darken-1"
        >streamline:horizontal-menu-circle-solid</v-icon
      >
    </v-btn>

    <v-spacer />

    <v-avatar
      class="d-flex align-center justify-center bg-primary cursor-pointer"
      size="40"
      @click="changeTheme(!isDark)"
    >
      <v-icon
        size="30"
        :key="`${isDark}`"
        :icon="
          isDark
            ? 'line-md:moon-alt-to-sunny-outline-loop-transition'
            : 'line-md:sunny-outline-to-moon-alt-loop-transition'
        "
      />
      <v-tooltip activator="parent">
        Mudar para tema {{ isDark ? "claro" : "escuro" }}
      </v-tooltip>
    </v-avatar>

    <v-menu offset-x :close-on-content-click="false" :close-on-back="true">
      <template v-slot:activator="{ props }">
        <v-btn icon rounded="xl" class="mx-2">
          <v-avatar
            size="38"
            border="sm"
            variant="flat"
            v-bind="props"
            color="avatar"
            class="font-weight-bold"
          >
            {{ userInitials }}
          </v-avatar>
          <v-tooltip activator="parent">Perfil</v-tooltip>
        </v-btn>
      </template>

      <v-card width="280" height="auto" class="pa-3" elevation="5">
        <div class="text-center">
          <v-card class="elevation-0">
            <template #title>
              <v-avatar
                size="60"
                class="mb-2 mx-3 font-weight-bold"
                variant="flat"
                color="avatar"
              >
                {{ userInitials }}
              </v-avatar>
              <h4>{{ user?.name || "User" }}</h4>
            </template>
            <template #subtitle>
              <p>{{ user?.email || "email" }}</p>
            </template>
          </v-card>
        </div>

        <v-divider />

        <v-card-actions>
          <v-btn
            color="primary-lighten-1"
            variant="tonal"
            width="100%"
            class="hover-xs"
            prepend-icon="mdi:logout"
            @click="logout()"
          >
            SAIR
            <v-tooltip activator="parent">Sair</v-tooltip>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { userSessionStore } from "@/stores/user-session-store";
import { useTheme } from "vuetify";

const appTheme = ref("lightTeal");
const vuetifyTheme = useTheme();

const emit = defineEmits(["toggle-navigation"]);

const user = userSessionStore.user;
const userInitials = ref<string>();

const showAppBar = ref(true);

function getInitials() {
  const name = (user?.name as string)?.split(" ")[0];
  userInitials.value = name?.[0]?.toUpperCase() || "?";
}

function logout() {
  userSessionStore.logout();
  window.location.reload();
}

function toggleNavigation() {
  emit("toggle-navigation");
}

const isDark = ref(appTheme.value === "dark");

function changeTheme(value: boolean | null) {
  // value é o novo estado do switch
  isDark.value = value as boolean;

  appTheme.value = value ? "dark" : "light";

  vuetifyTheme.global.name.value = appTheme.value;
  localStorage.setItem("theme", appTheme.value);
}

function detectTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme !== null) appTheme.value = savedTheme;

  if (!savedTheme)
    appTheme.value = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  vuetifyTheme.global.name.value = appTheme.value;
  isDark.value = appTheme.value == "dark";
}

onMounted(() => {
  getInitials();
  detectTheme();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", detectTheme);
});

onUnmounted(() => {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .removeEventListener("change", detectTheme);
});
</script>

<style scoped>
.v-app-bar {
  transition: top 0.3s ease, opacity 0.3s ease;
}
</style>

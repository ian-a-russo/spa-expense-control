<template>
  <v-card
    class="d-flex align-center pa-5 modern-side-card"
    rounded="xl"
    elevation="3"
  >
    <div class="side-bar"></div>

    <div class="ml-6">
      <h2 class="text-h5 font-weight-medium">
        {{ title }}
      </h2>

      <p class="text-body-2 opacity-70 mt-1">
        {{ description }}
      </p>
    </div>

    <div class="ml-auto" v-if="icon">
      <v-avatar :size="isMobile ? 60 : 80" class="icon-avatar">
        <v-icon :size="isMobile ? 40 : 55">
          {{ icon }}
        </v-icon>
      </v-avatar>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { isMobile } from "@/stores/mobile";

defineProps<{
  title?: string;
  icon?: string;
  description?: string;
}>();
</script>

<style scoped>
.modern-side-card {
  position: relative;
  overflow: hidden;
}

.side-bar {
  position: absolute;
  left: 0;
  top: 0;
  width: 1%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgb(var(--v-theme-primary)),
    rgb(var(--v-theme-primary-darken-1))
  );
  border-radius: 6px 0 0 6px;
}

.icon-avatar {
  background: rgb(var(--v-theme-primary-darken-1), 0.3);
  backdrop-filter: blur(4px);
}
</style>

<template>
  <v-alert
    v-model="isAlertOpen"
    :color="notifySnake.type"
    rounded="lg"
    :title="notifySnake.title"
    max-width="500px"
    class="p-fixed pa-0"
  >
    <div class="d-flex justify-start align-center pa-4">
      <v-icon class="mr-3" size="40">{{ detailsByType.icon }}</v-icon>

      <div>
        <p class="text-lg">{{ detailsByType.title }}</p>
        <p class="text-md">{{ notifySnake.message }}</p>
      </div>
    </div>

    <v-progress-linear :model-value="percent" height="6" class="mt-1 mb-0" />
  </v-alert>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { notifySnake } from "@/stores/notifySnake";

const isAlertOpen = computed(() => notifySnake.show);
const percent = ref(100);

let intervalId: number | null = null;

const detailsByType = computed(() => {
  if (notifySnake.type === "error")
    return { icon: "mdi:alert-circle-outline", title: "Erro" };
  if (notifySnake.type === "success")
    return { icon: "mdi:check", title: "Sucesso" };
  if (notifySnake.type === "warning")
    return { icon: "mdi:alert", title: "Aviso" };
  return { icon: "mdi:email-outline", title: "Informação" };
});

function startCountdown() {
  percent.value = 100;
  stopCountdown();

  intervalId = setInterval(() => {
    percent.value -= 1;

    if (percent.value <= 0) {
      clearInterval(intervalId!);
      intervalId = null;

      setTimeout(() => {
        notifySnake.show = false;
      }, 150);
    }
  }, 50);
}

function stopCountdown() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

watch(isAlertOpen, (newVal) => {
  if (newVal) {
    return startCountdown();
  }
  stopCountdown();
});

watch(notifySnake, (newVal) => {
  if (newVal) {
    return startCountdown();
  }
  stopCountdown();
});
</script>

<style scoped>
.p-fixed {
  position: fixed !important;
  z-index: 10000 !important;
  top: 4.5rem !important;
  right: 0.5rem !important;
  opacity: 0.95 !important;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.009375em;
  line-height: 1.5;
  text-transform: none;
}

.text-md {
  font-size: 1rem;
  opacity: 0.7;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  line-height: 1.2rem;
  text-transform: none;
}
</style>

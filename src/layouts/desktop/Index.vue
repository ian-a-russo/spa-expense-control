<template>
  <v-layout class="rounded rounded-md modern-gradient-background">
    <Navigation v-model="isOpen" />
    <AppBar @toggle-navigation="isOpen = !isOpen" />
    <v-main style="min-height: 300px" class="d-flex justify-center">
      <router-view v-slot="{ Component, route }">
        <transition name="slide" mode="out-in">
          <div
            class="d-flex align-center flex-column"
            fluid
            :key="route.fullPath"
          >
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import AppBar from "./AppBar.vue";
import Navigation from "./Navigation.vue";
const isOpen = ref(true);
</script>

<style scoped>
.img-card {
  position: absolute;
  right: 40px;
  top: 0px;
  width: 300px;
  z-index: -1;
}

@media screen and (max-width: 768px) {
  .img-card {
    right: 20px;
    width: 150px;
  }
}

.link {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}
.link:hover {
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 1);
  color: rgba(var(--v-theme-primary-lighten-1), 1) !important;
  transform: scale(1.2);
}

/* Estado inicial: ENTRANDO da esquerda */
.slide-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

/* Estado final da entrada */
.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* Estado inicial: SAINDO para a direita */
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Estado final da saída */
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Transição em si */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>

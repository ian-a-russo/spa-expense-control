<template>
  <v-app>
    <router-view />
    <AlertDefault />
  </v-app>
</template>

<script setup lang="ts">
import AlertDefault from "./components/alerts/AlertDefault.vue";
</script>

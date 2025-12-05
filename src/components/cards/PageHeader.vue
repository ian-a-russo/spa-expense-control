<template>
  <v-card
    rounded="lg"
    color="primary"
    variant="tonal"
    height="8rem"
    class="d-flex justify-space-between align-center"
  >
    <div :class="icon ? 'w-75' : 'w-100'">
      <p class="text-h4 title text-font" :class="isMobile ? 'mx-5' : 'mx-8'">
        {{ title }}
      </p>

      <small
        class="opacity-60 d-flex flex-nowrap text-md"
        :class="isMobile ? 'mx-5' : 'mx-8 '"
      >
        {{ description }}
      </small>
    </div>
    <v-icon
      class="img-card"
      color="primary"
      :size="isMobile ? '70' : '110'"
      v-if="icon"
    >
      {{ icon }}
    </v-icon>
  </v-card>
</template>

<script setup lang="ts">
import { isMobile } from "@/stores/mobile";

defineProps<{
  title?: string;
  icon?: string;
  image?: string;
  description?: string;
}>();
</script>

<style scoped>
.img-card {
  margin-right: 20px !important;
}
@media screen and (max-width: 768px) {
  .img-card {
    right: 20px;
    margin-right: 0px !important;
  }
}
</style>

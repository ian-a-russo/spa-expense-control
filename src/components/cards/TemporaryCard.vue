<template>
  <v-card max-width="350px">
    <v-card-text>
      <v-row>
        <v-col md="12" class="text-center my-6">
          <p class="font-weight-medium text-h5">{{ props.title }}</p>
        </v-col>
        <v-col md="12" class="d-flex justify-center">
          <v-icon color="success" size="80">{{ props.icon }}</v-icon>
        </v-col>
        <v-col md="12" class="d-flex justify-center">
          <p class="my-6">{{ props.endingMessage }}</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  endingMessage: {
    type: String,
    required: true,
  },
});
</script>

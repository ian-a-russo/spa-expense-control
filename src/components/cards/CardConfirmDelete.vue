<template>
  <v-card class="pa-6 rounded-lg">
    <div class="text-center">
      <v-icon
        size="64"
        color="error"
        class="mb-4"
        icon="mdi:alert-circle-outline"
      />
      <h3 class="font-weight-bold mb-2">{{ title ?? "Deseja excluir?" }}</h3>
      <p class="text-body-2 grey--text mb-4">
        {{ description }}
      </p>
    </div>

    <v-card-actions class="justify-space-around">
      <v-btn
        variant="outlined"
        class="rounded-lg px-6"
        :disabled="loading"
        @click="emit('close')"
        width="100"
      >
        Cancelar
      </v-btn>

      <v-btn
        variant="flat"
        color="error"
        class="rounded-lg px-6"
        :loading="loading"
        @click="confirmDelete"
        width="100"
      >
        Excluir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { errorMessages } from "@/services/http/error-messages";

const emit = defineEmits(["delete-success", "close"]);
const props = defineProps<{
  confirmDelete: () => Promise<void>;
  description: string;
  title?: string;
}>();

async function confirmDelete() {
  try {
    loading.value = true;
    await props.confirmDelete();
    emit("delete-success");
    emit("close");
  } catch (error) {
    errorMessages.handler(error);
  } finally {
    dialog.value = false;
    loading.value = false;
  }
}

const loading = ref(false);
const dialog = ref(false);
</script>

<template>
  <div>
    <v-dialog v-model="dialog" max-width="420px" persistent>
      <template #activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          class="rounded-circle"
          color="error"
          density="comfortable"
          rounded="xl"
          icon
          variant="text"
        >
          <v-icon :size="size ? size : '40px'">
            {{ icon ? icon : "mdi-delete" }}
          </v-icon>
        </v-btn>
        <v-tooltip activator="parent" text="Excluir" />
      </template>

      <v-card class="pa-6 rounded-lg">
        <div class="text-center">
          <v-icon
            class="mb-4"
            color="error"
            icon="mdi-alert-circle"
            size="64"
          />
          <h3 class="font-weight-bold mb-2">Deseja excluir?</h3>
          <p class="text-body-2 grey--text mb-4">
            {{ description }}
          </p>
        </div>

        <v-card-actions class="justify-space-around">
          <v-btn
            class="rounded-lg px-6"
            :disabled="loading"
            variant="tonal"
            width="100"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            class="rounded-lg px-6"
            color="error"
            :loading="loading"
            variant="flat"
            width="100"
            @click="deleteItem()"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["delete-success"]);

type Props = {
  confirmDelete: () => Promise<void>;
  description: string;
  icon?: string;
  size?: string | number;
};
const props = defineProps<Props>();

const loading = ref(false);
const dialog = ref(false);

async function deleteItem() {
  try {
    loading.value = true;
    await props.confirmDelete();
    emit("delete-success");
  } finally {
    dialog.value = false;
    loading.value = false;
  }
}
</script>

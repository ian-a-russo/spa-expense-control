<template>
  <div>
    <v-dialog v-model="dialog" max-width="360px">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          icon="mdi:delete"
          color="error"
          v-bind="activatorProps"
          density="comfortable"
          class="rounded-circle"
        />
        <v-tooltip activator="parent" text="Excluir" />
      </template>

      <CardConfirmDelete
        :title="title"
        @close="dialog = false"
        :description="description"
        @delete-success="emit('delete-success')"
        :confirm-delete="() => confirmDelete()"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import CardConfirmDelete from "../cards/CardConfirmDelete.vue";

const emit = defineEmits(["delete-success"]);
defineProps<{
  confirmDelete: () => Promise<void>;
  description: string;
  title?: string;
}>();

const dialog = ref(false);
</script>

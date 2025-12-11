<template>
  <v-dialog
    :model-value="dialog"
    :fullscreen="mobile"
    height="auto"
    persistent
    width="350"
  >
    <FormExpense :loading="loading" @close="emit('close')" @save="save" />
  </v-dialog>
</template>

<script setup lang="ts">
import { notify } from "@/services/http/notify";
import { useDisplay } from "vuetify";
import { errorMessages } from "@/services/http/error-messages";
import { httpCoordinator } from "@/services/http/axios/http-coordinator.http";
import type { IExpense } from "@/services/http/expense/i-expense";
import type { ExpenseForm } from "./FormExpense.vue";
import FormExpense from "./FormExpense.vue";

const props = defineProps<{
  dialog: boolean;
}>();

const { mobile } = useDisplay();
const emit = defineEmits(["save", "close"]);
const loading = ref(false);

async function save(expense: ExpenseForm) {
  try {
    loading.value = true;

    await httpCoordinator.expense.create(expense);

    emit("save");
    notify("Sucesso ao salvar.", "success");
    emit("close");
  } catch (error) {
    errorMessages.handler(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <v-dialog
    :model-value="dialog"
    :fullscreen="mobile"
    height="auto"
    persistent
    width="350"
  >
    <FormExpense
      :item="editExpense"
      :loading="loading"
      @close="emit('close')"
      @save="save"
      :payment-methods="paymentMethods"
      :categories="categories"
      :persons="persons"
    />
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
import type { IPerson } from "@/services/http/person/i-person";
import type { ICategory } from "@/services/http/category/i-category";
import type { IPaymentMethod } from "@/services/http/payment-method/i-payment-method";

const props = defineProps<{
  editExpense?: IExpense;
  dialog: boolean;
  persons?: IPerson[];
  categories?: ICategory[];
  paymentMethods?: IPaymentMethod[];
}>();

const { mobile } = useDisplay();
const emit = defineEmits(["save", "close"]);
const loading = ref(false);

async function save(expense: ExpenseForm) {
  try {
    loading.value = true;

    await httpCoordinator.expense.update(
      props.editExpense?.id as number,
      expense
    );

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

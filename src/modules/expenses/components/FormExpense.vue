<template>
  <v-card class="rounded-xl">
    <v-card-title class="text-h6 font-weight-medium d-flex align-center gap-2">
      <v-icon size="22" class="mr-4">
        {{
          isEdit
            ? "streamline-freehand:edit-pencil"
            : "streamline-freehand:vectors-pen-draw"
        }}
      </v-icon>

      {{ isEdit ? "Editar Gasto" : "Cadastrar Gasto" }}
    </v-card-title>

    <v-divider />

    <v-card-text class="d-flex flex-column gap-4 px-4 py-2">
      <v-form ref="form">
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              rounded="xl"
              class="py-1"
              v-model="formBody.name"
              :rules="[required]"
              variant="solo-filled"
              density="comfortable"
              hide-details
              label="Nome do Gasto"
              prepend-inner-icon="streamline-freehand:task-list-pin-1"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              rounded="xl"
              class="py-1"
              v-model="formBody.description"
              variant="solo-filled"
              density="comfortable"
              hide-details
              label="Descrição"
              prepend-inner-icon="streamline-freehand:office-file-text"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              rounded="xl"
              class="py-1"
              v-model="formBody.personId"
              :items="[{ id: 1, name: 'José' }]"
              item-title="name"
              item-value="id"
              :rules="[required]"
              variant="solo-filled"
              density="comfortable"
              hide-details
              label="Pessoa"
              prepend-inner-icon="streamline-freehand:face-id-male-1"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              rounded="xl"
              class="py-1"
              v-model="formBody.paymentMethodId"
              :items="[{ id: 1, name: 'Cartão de Crédito' }]"
              item-title="name"
              item-value="id"
              :rules="[required]"
              variant="solo-filled"
              density="comfortable"
              hide-details
              label="Método de Pagamento"
              prepend-inner-icon="streamline-freehand:credit-card-1"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              rounded="xl"
              class="py-1"
              v-model="formBody.categoryId"
              :items="[{ id: 1, name: 'Alimentação' }]"
              item-title="name"
              item-value="id"
              :rules="[required]"
              variant="solo-filled"
              density="comfortable"
              hide-details
              label="Categoria"
              prepend-inner-icon="streamline-freehand:tags-double"
            />
          </v-col>

          <v-col cols="12">
            <v-number-input
              rounded="xl"
              class="py-1"
              control-variant="stacked"
              prepend-inner-icon="streamline-freehand:money-cash-bill"
              v-model="formBody.price"
              :rules="[required]"
              :precision="2"
              :min="0"
              hide-details
              label="Preço"
              variant="solo-filled"
              density="comfortable"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-divider />

    <v-card-actions class="d-flex justify-end gap-2">
      <v-btn
        :disabled="loading"
        variant="tonal"
        text="Cancelar"
        class="px-6"
        @click="emit('close')"
      />

      <v-btn
        :loading="loading"
        :color="isEdit ? 'warning' : 'primary'"
        :text="isEdit ? 'Editar' : 'Salvar'"
        variant="flat"
        class="px-6"
        @click="save"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { IExpense } from "@/services/http/expense/i-expense";
import { required } from "@/validations/required.rule";

export type ExpenseForm = {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  personId?: number;
  paymentMethodId?: number;
};

const props = defineProps<{
  item?: IExpense;
  loading: boolean;
}>();

const emit = defineEmits(["save", "close"]);
const form = ref();

const isEdit = computed(() => !!props.item?.id);

const formBody = ref<ExpenseForm>({
  name: undefined,
  description: undefined,
  price: undefined,
  categoryId: undefined,
  userId: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  personId: undefined,
  paymentMethodId: undefined,
});

/* SELECTED OBJECTS */
const selectedCategory = ref<any>(null);
const selectedPerson = ref<any>(null);
const selectedPaymentMethod = ref<any>(null);

/* UPDATE HANDLERS */
function onSelectCategory(value: any) {
  formBody.value.categoryId = value?.id || 0;
}
function onSelectPerson(value: any) {
  formBody.value.personId = value?.id || 0;
}
function onSelectPayment(value: any) {
  formBody.value.paymentMethodId = value?.id || 0;
}

/* LOAD DATA WHEN EDITING */
onMounted(() => {
  if (!props.item) return;
  formBody.value = { ...props.item };

  selectedCategory.value = { id: props.item.categoryId, name: "Carregando..." };
  selectedPerson.value = { id: props.item.personId, name: "Carregando..." };
  selectedPaymentMethod.value = {
    id: props.item.paymentMethodId,
    name: "Carregando...",
  };
});

/* SAVE */
async function save() {
  const { valid } = await form.value.validate();
  if (!valid) return;

  emit("save", formBody.value);
}
</script>

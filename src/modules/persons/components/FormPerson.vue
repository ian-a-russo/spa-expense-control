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

      {{ isEdit ? "Editar Compra" : "Cadastrar Compra" }}
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
              variant="solo-filled"
              density="comfortable"
              hide-details
              label="Nome"
              prepend-inner-icon="streamline-freehand:office-file-text"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              rounded="xl"
              class="py-1"
              v-model="formBody.familiarityId"
              :items="[
                { id: 1, name: 'Filho' },
                { id: 2, name: 'Cônjuge' },
                { id: 3, name: 'Parente' },
                { id: 4, name: 'Amigo' },
                { id: 5, name: 'Outro' },
              ]"
              item-title="name"
              item-value="id"
              :rules="[required]"
              variant="solo-filled"
              density="comfortable"
              hide-details
              label="Familiaridade"
              prepend-inner-icon="streamline-freehand:face-id-male-1"
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
import type { IPerson } from "@/services/http/person/i-person";
import { required } from "@/validations/required.rule";

export type PersonForm = {
  name?: string;
  familiarityId?: number;
};

const props = defineProps<{
  item?: IPerson;
  loading: boolean;
}>();

const emit = defineEmits(["save", "close"]);
const form = ref();

const isEdit = computed(() => !!props.item?.id);

const formBody = ref<PersonForm>({
  name: undefined,
  familiarityId: undefined,
});

onMounted(() => {
  if (!props.item) return;
  formBody.value = { ...props.item };
});

async function save() {
  const { valid } = await form.value.validate();
  if (!valid) return;

  emit("save", formBody.value);
}
</script>

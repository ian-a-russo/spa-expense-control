<template>
  <v-dialog
    :model-value="dialog"
    :fullscreen="mobile"
    height="auto"
    persistent
    width="450"
  >
    <FormPerson
      :loading="loading"
      @close="emit('close')"
      @save="save"
      :familiarities="familiarities"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { notify } from "@/services/http/notify";
import { useDisplay } from "vuetify";
import { errorMessages } from "@/services/http/error-messages";
import { httpCoordinator } from "@/services/http/axios/http-coordinator.http";
import type { PersonForm } from "./FormPerson.vue";
import FormPerson from "./FormPerson.vue";
import type { IFamiliarity } from "@/services/http/familiarity/i-familiarity";

const props = defineProps<{
  familiarities?: IFamiliarity[];
  dialog: boolean;
}>();

const { mobile } = useDisplay();
const emit = defineEmits(["save", "close"]);
const loading = ref(false);

async function save(person: PersonForm) {
  try {
    loading.value = true;

    await httpCoordinator.person.create(person);

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

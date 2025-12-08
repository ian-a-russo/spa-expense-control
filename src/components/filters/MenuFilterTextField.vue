<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="top right">
    <template v-slot:activator="{ props }">
      <div class="flex-nowrap row-filter d-flex align-center">
        <div class="mr-3">
          {{ title }}
        </div>
        <v-badge v-if="internalValue" color="warning" dot>
          <v-icon v-bind="props"> mdi:filter </v-icon>
        </v-badge>
        <v-icon v-if="!internalValue" v-bind="props"> mdi:filter </v-icon>
      </div>
    </template>

    <v-card min-width="250" class="pa-3 py-3" rounded="xl">
      <v-text-field
        @click:clear="clearText"
        clearable
        :label="title"
        autofocus
        hide-details
        variant="outlined"
        density="comfortable"
        rounded="xl"
        :model-value="internalValue"
        @input="emitValue($event.target.value)"
      ></v-text-field>
    </v-card>
  </v-menu>
</template>
<script lang="ts" setup>
import vuetify from "@/plugins/vuetify";
import { ref } from "vue";

let menu = ref(false);
const props = defineProps({
  title: {
    type: String,
  },
  modelValue: {
    required: false,
  },
  uppercase: {
    type: Boolean,
    default: false,
  },
  modelModifiers: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);
let internalValue = ref<string | null>("");

const timeout = ref();

function emitValue(value: string | null) {
  if (value == null) return;
  if (props.modelModifiers.uppercase || props.uppercase) {
    value = value.toUpperCase();
  }
  let filter = value.replace("*", "");
  internalValue.value = filter;
  clearTimeout(timeout.value);

  timeout.value = setTimeout(() => {
    if (value == "") return emit("update:modelValue", undefined);
    emit("update:modelValue", `*${value}*`);
  }, 500);
}
function clearText() {
  internalValue.value = null;
  emit("update:modelValue", null);
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .v-icon {
    display: none !important;
  }
}

.row-filter {
  margin: initial;
  display: flex;
}

.v-input .v-input__details {
  display: none !important;
}
</style>

<template v-slot:text>
  <v-text-field
    :model-value="internalValue"
    :label="title || 'Pesquisar...'"
    prepend-inner-icon="mdi-magnify"
    hide-details
    density="comfortable"
    variant="solo-filled"
    rounded="xl"
    flat
    class="filter-input"
    @input="emitValue($event.target.value)"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

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
.filter-input {
  max-width: 320px;
  transition: 0.15s ease;
}

.filter-input :deep(.v-field) {
  background-color: rgba(0, 0, 0, 0.035) !important;
  box-shadow: none !important;
}

.filter-input :deep(.v-field:hover) {
  background-color: rgba(0, 0, 0, 0.05) !important;
}

.filter-input :deep(.v-field--focused) {
  background-color: rgba(0, 0, 0, 0.06) !important;
}

.filter-input :deep(input) {
  font-size: 0.95rem;
}
</style>

<template v-slot:text>
  <v-text-field
    :model-value="internalValue"
    label="Search"
    prepend-inner-icon="mdi:magnify"
    hide-details
    rounded="lg"
    variant="outlined"
    density="compact"
    @input="emitValue($event.target.value)"
  ></v-text-field>
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

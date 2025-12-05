<template>
  <v-menu width="300" :close-on-content-click="false" location="top left">
    <template v-slot:activator="{ props }">
      <div class="flex-nowrap row-filter d-flex align-center">
        <div class="mr-3 text-white">
          {{ title }}
        </div>
        <v-badge v-if="isSelected" color="warning" dot>
          <v-icon v-bind="props"> mdi:filter </v-icon>
        </v-badge>
        <v-icon v-else v-bind="props" class="ml-2"> mdi:filter </v-icon>
      </div>
    </template>
    <v-card min-width="250px" class="pa-3 py-3" rounded="lg">
      <slot name="top"></slot>
      <v-autocomplete
        v-bind="$attrs"
        variant="outlined"
        density="comfortable"
        rounded="lg"
        color="primary"
        v-model="internalValue"
        @update:model-value="emit('update:modelValue', $event)"
        clearable
        chips
        @click:clear="clearable()"
      >
        <template #item="slotProps">
          <slot name="item" v-bind="slotProps">
            <v-list-item v-bind="slotProps.props">
              {{ slotProps.item.title || slotProps.item.value }}
            </v-list-item>
          </slot>
        </template>
      </v-autocomplete>
      <slot name="bottom"></slot>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: { required: false },
  title: { type: String, required: false },
});

const internalValue = ref(props.modelValue);
const emit = defineEmits(["update:modelValue"]);

const isSelected = computed(() => {
  if (internalValue.value === false) return true;
  if (Array.isArray(internalValue.value)) return internalValue.value.length > 0;
  return !!internalValue.value;
});

function clearable() {
  emit("update:modelValue", undefined);
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .v-icon {
    display: none !important;
  }
}
</style>

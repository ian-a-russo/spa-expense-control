<template>
  <v-data-table-server
    :items-length="itemsLength"
    class="custom-table scrollable-lg"
    :hide-default-header="vuetify.display.mdAndDown.value"
    rounded="lg"
    hover
    v-bind="$attrs"
    density="comfortable"
    :mobile="isMobile"
    no-data-text="Ops! Não foram encontrados itens :("
  >
    <template v-for="slotName in slotsNames" v-slot:[slotName]="slotProps">
      <th :class="`d-flex justify-${getHeaderAlign(slotName)} `">
        <slot :name="slotName" v-bind="slotProps">
          {{ slotProps.title }}
        </slot>
      </th>
    </template>

    <template
      v-for="header in attrs.headers"
      :key="header.title"
      v-slot:[`item.${header.key}`]="{ item }"
    >
      <td
        :data-label="header.title"
        :class="
          isMobile
            ? 'd-flex justify-left text-left'
            : `d-flex justify-${header.align} `
        "
      >
        <slot :name="`item.${header.key}`" :item="item">
          {{ getValue(item, header) }}
        </slot>
      </td>
    </template>
  </v-data-table-server>
</template>

<script lang="ts" setup>
import vuetify from "@/plugins/vuetify";
import { isMobile } from "@/stores/mobile";

const slots = useSlots();
const attrs: any = useAttrs();
const slotsNames: string[] = Object.keys(slots);

defineProps({
  itemsLength: {
    type: Number as PropType<number | string>,
    required: true,
  },
});

function getValue(item: any, header: any) {
  return eval(`item.${header.key}`);
}

function getHeaderAlign(slotName: string) {
  const targetHeader = (attrs.headers as Header[])?.find((h) => {
    const keyName = slotName.replace(/^.*?\./, "");
    return h.key == keyName;
  });
  if (targetHeader?.align) return targetHeader.align;

  return "start";
}

type Header = {
  title: string;
  key: string;
  sortable: boolean;
  align?: "center" | "start" | "end" | undefined;
};

type SortBy = {
  order: string;
  key: string;
};

type Options = {
  itemsPerPage: number;
  page: number;
  sortBy: SortBy[];
};

export type { Options, SortBy, Header };
</script>

<style scoped>
.custom-table {
  background-color: transparent !important;

  & :deep(th) {
    background-color: transparent !important;
    font-weight: lighter !important;
  }

  & :deep(.v-data-table__td-title) {
    font-weight: 750 !important;
  }
}

@media screen and (max-width: 768px) {
  .custom-table :deep(th) {
    justify-content: start !important;
    background-color: transparent !important;
  }

  .custom-table :deep(.v-data-table__td-value) {
    width: 100%;
  }
}

.v-list--density-default {
  padding: 0 !important;
  margin: 0 !important;
  background-color: rgba(var(--v-theme-background-lighten-1)) !important;
}
</style>

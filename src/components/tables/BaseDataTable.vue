<template>
  <v-data-table-server
    :items-length="itemsLength"
    class="custom-table scrollable-lg"
    :hide-default-header="vuetify.display.mdAndDown.value"
    rounded="xl"
    hover
    v-bind="$attrs"
    density="comfortable"
    :mobile="isMobile"
    no-data-text="Nenhum registro encontrado"
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
  border-radius: 12px;
  overflow: hidden;
}

/* Garantir que o header nunca pareça input */
.custom-table :deep(th) {
  cursor: default !important;
}

/* Se houver filtro, deixar o header com aparência de "interativo", mas não input */
.custom-table :deep(th .v-icon) {
  opacity: 0.7;
  cursor: pointer !important;
  transition: opacity 0.15s ease;
}

.custom-table :deep(th .v-icon:hover) {
  opacity: 1;
}

/* Remover qualquer aparência de caixa de input */
.custom-table :deep(th) {
  box-shadow: none !important;
  border: none !important;
}

/* CÉLULAS */
.custom-table :deep(td) {
  padding: 14px 12px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
}

/* ZEBRA ROWS */
.custom-table :deep(tr:nth-child(even)) td {
  background: rgba(255, 255, 255, 0.02);
}

/* HOVER suave e elegante */
.custom-table :deep(tbody tr:hover) td {
  background: rgba(140, 100, 255, 0.12) !important;
  transition: background 0.2s ease;
}

/* MOBILE – estilo cartão */
@media (max-width: 768px) {
  .custom-table :deep(tbody td) {
    display: flex !important;
    justify-content: space-between;
    padding: 14px 10px !important;
    background: rgba(255, 255, 255, 0.03);
    margin-bottom: 8px;
    border-radius: 10px;
  }

  .custom-table :deep(tbody tr) {
    display: block !important;
    margin-bottom: 10px;
    border: none !important;
  }

  .custom-table :deep(tbody tr:hover) td {
    background: rgba(140, 100, 255, 0.15) !important;
  }

  /* header escondido com elegância */
  .custom-table :deep(thead) {
    display: none;
  }
}

/* Dropdown de density, pagination, menu */
.v-list--density-default {
  padding: 4px !important;
  margin: 0 !important;
  background-color: rgba(var(--v-theme-surface), 0.9) !important;
  backdrop-filter: blur(8px);
}
</style>

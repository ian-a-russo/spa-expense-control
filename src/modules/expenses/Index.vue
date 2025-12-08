<template>
  <div class="page-layout">
    <!-- HEADER -->
    <PageHeader
      :width="isMobile ? '95%' : '75rem'"
      title="Gastos"
      description="Gerenciamento de Gastos"
      icon="streamline-freehand:money-coin-cash"
      class="mb-6"
    />

    <!-- CARD PRINCIPAL -->
    <v-card
      :width="isMobile ? '95%' : '75rem'"
      rounded="xl"
      elevation="3"
      color="surface"
      class="content-wrapper"
    >
      <!-- TOP BAR: BUSCA -->
      <div class="top-actions">
        <SearchBar
          class="search-bar"
          v-model:model-value="filter.name"
          label="Buscar gastos..."
          density="comfortable"
        />
      </div>

      <!-- TABELA -->
      <BaseDataTable
        :items-length="itemsLength"
        :items="response?.data"
        :loading="loading"
        :headers="headers"
        :mobile="isMobile"
        @update:options="loadItems"
      >
        <template #item.user.name="{ item }">
          <v-chip prepend-icon="mdi:account" variant="flat">
            {{ item.user.name }}
          </v-chip>
        </template>

        <template #item.price="{ item }">
          <span class="price"> R$ {{ item.price.toFixed(2) }} </span>
        </template>

        <template #item.actions="{ item }">
          <div class="actions">
            <DialogConfirmDelete
              :description="`Confirma exclusão do gasto '${item.name}'?`"
              :confirm-delete="async () => deleteItem(item.id)"
              @delete-success="loadItems"
            />
          </div>
        </template>

        <template #item.updatedAt="{ item }">
          <div class="opacity-80">
            {{ DateFormatter.formatWithTime(item.updatedAt) }}
          </div>
        </template>
      </BaseDataTable>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import type { IExpense } from "@/services/expense/i-expense";
import type { ResponsePaginate } from "@/services/http/i-base.http";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete.vue";
import type { Header, Options } from "@/components/tables/BaseDataTable.vue";
import BaseDataTable from "@/components/tables/BaseDataTable.vue";
import { notify } from "@/services/http/notify";
import MenuFilterTextField from "@/components/filters/MenuFilterTextField.vue";
import { errorMessages } from "@/services/http/error-messages";
import SearchBar from "@/components/text-fields/SearchBar.vue";
import PageHeader from "@/components/cards/PageHeader.vue";
import { DateFormatter } from "@/utils/date-formatter";
import { isMobile } from "@/stores/mobile";
import { httpCoordinator } from "@/services/http/axios/http-coordinator.http";

const itemsLength = ref<number | string>(1);
const loading = ref(false);
const items = ref<IExpense[]>([{}] as any);
const options = ref<Options>({
  itemsPerPage: 10,
  page: 1,
  sortBy: [],
});

const filter = ref({
  name: undefined,
  user: { name: undefined },
  category: { name: undefined },
});

watch(
  filter,
  () => {
    loadItems(options.value);
  },
  { deep: true }
);

async function deleteItem(id: number) {
  try {
    loading.value = true;

    await httpCoordinator.expense.delete(id);
    notify("Produto deletado.", "success");
    await loadItems(options.value);
  } catch (error) {
    errorMessages.handler(error);
  } finally {
    loading.value = false;
  }
}

async function loadItems(newOptions?: Options) {
  options.value = newOptions ? newOptions : options.value;
  loading.value = true;

  const order = defineOrder(options.value);

  try {
    const result = await httpCoordinator.expense.list({
      itemsPerPage: options.value.itemsPerPage,
      currentPage: options.value.page,
      order,
      ...filter.value,
    });

    items.value = result.data;
    itemsLength.value = result?.meta?.totalItems;
  } catch (e) {
  } finally {
    loading.value = false;
  }
}

function defineOrder(options: Options) {
  const order = {} as any;
  for (const item of options.sortBy) {
    const objectKey = item.key;

    order[objectKey] = item.order;
  }

  if (!Object.keys(order).length) return { id: "ASC" };

  return order;
}

const headers = computed((): Header[] => [
  {
    key: "name",
    sortable: false,
    title: "Nome do Gasto",
  },
  {
    key: "value",
    sortable: false,
    title: "Valor",
  },
  {
    key: "user.name",
    sortable: false,
    title: "Usuário",
  },
  {
    key: "category.name",
    sortable: false,
    title: "Categoria",
  },
  {
    key: "updatedAt",
    sortable: true,
    title: "Atualizado em",
    align: "center",
  },
  {
    align: "center",
    key: "actions",
    sortable: false,
    title: "Ações",
  },
]);
</script>

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.content-wrapper {
  padding: 2rem;
  margin-top: 1rem;
}

.top-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.search-bar {
  flex: 1;
  max-width: 20rem;
}

.header-filter {
  max-width: 12rem;
}

.price {
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

/* MOBILE */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }

  .top-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar {
    width: 100% !important;
    max-width: none !important;
  }

  .header-filter {
    width: 100%;
    max-width: none !important;
  }
}
</style>

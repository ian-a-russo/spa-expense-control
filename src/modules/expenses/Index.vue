<template>
  <PageHeader
    :width="isMobile ? '95%' : '75rem'"
    title="Gastos"
    description="Gerenciamento de Gastos"
    icon="streamline-freehand:money-coin-cash"
  />
  <v-card
    :width="isMobile ? '95%' : '75rem'"
    rounded="lg"
    border="md"
    class="pa-5 mx-8 mt-6 border-line-border"
    color="transparent"
  >
    <div class="d-flex align-center mb-5">
      <SearchBar
        class="search-bar"
        v-model:model-value="filter.name"
        label="Buscar Gastos"
      />
    </div>

    <BaseDataTable
      :items-length="itemsLength"
      :items="response?.data"
      :loading="loading"
      :headers="headers"
      @update:options="loadItems"
    >
      <template #header.name="{ column }">
        <MenuFilterTextField
          class="hide-on-mobile"
          v-model:model-value="filter.name"
          :title="column.title"
          hide-details
        />
      </template>
      <template #header.user.name="{ column }">
        <MenuFilterTextField
          v-model:model-value="filter.user.name"
          :title="column.title"
          hide-details
        />
      </template>
      <template #header.category.name="{ column }">
        <MenuFilterTextField
          v-model:model-value="filter.category.name"
          :title="column.title"
          hide-details
        />
      </template>
      <template v-slot:item.user.name="{ item }">
        <v-chip prepend-icon="mdi:account">
          {{ item.user.name }}
        </v-chip>
      </template>
      <template v-slot:item.price="{ item }">
        {{ "R$" + item.price.toFixed(2) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <div :class="isMobile ? 'd-flex pa-0 mx-0' : 'd-flex pa-2'">
          <DialogConfirmDelete
            :description="`Confirma exclusão do produto '${item.name}'?`"
            :confirm-delete="async () => deleteItem(item.id)"
            @delete-success="loadItems"
          />
        </div>
      </template>
      <template #item.updatedAt="{ item }">
        <div>
          {{ DateFormatter.formatWithTime(item.updatedAt) }}
        </div>
      </template>
    </BaseDataTable>
  </v-card>
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
const response = ref<ResponsePaginate<IExpense>>({} as any);
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
    response.value = await httpCoordinator.expense.list({
      itemsPerPage: options.value.itemsPerPage,
      currentPage: options.value.page,
      order,
      ...filter.value,
    });

    itemsLength.value = response?.value?.meta?.totalItems;
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
    title: "Nome",
  },
  {
    key: "price",
    sortable: false,
    title: "Preço",
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
.search-bar {
  margin-left: 5px;
  margin-right: 5px;
  width: 100px !important;
}

@media screen and (max-width: 768px) {
  .search-bar {
    margin-right: 0px;
    margin-left: 0px;
    width: 100% !important;
  }
}
</style>

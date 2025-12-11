<template>
  <PageHeader
    :width="isMobile ? '100%' : '75rem'"
    title="Gastos"
    description="Gerenciamento de Gastos"
    icon="streamline-freehand:money-coin-cash"
    class="mb-6"
  />

  <v-card
    class="w-100 pa-6 rounded-xl bg-surface d-flex flex-column gap-6"
    rounded="xl"
    elevation="3"
  >
    <v-row class="align-center justify-center mb-5 flex-wrap" no-gutters>
      <v-col :cols="isMobile ? 12 : 6" class="d-flex align-center px-4">
        <SearchBar
          v-model:model-value="filter.name"
          label="Buscar por nome"
          class="w-100"
        />
      </v-col>

      <v-col
        :cols="isMobile ? 12 : 6"
        class="d-flex align-center justify-end px-4 mt-4 mt-sm-0"
      >
        <MenuFilterExpense
          @update:filter="(value: any) => (filter.uuidSegment = value)"
        />
      </v-col>
    </v-row>

    <v-container fluid class="pa-0">
      <v-row dense align="stretch" v-if="items.length">
        <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="pa-4"
        >
          <v-card
            @click="openEditDialog(item)"
            class="custom-card fill-height rounded-xl bg-surface d-flex flex-column justify-space-between pa-4 transition-fast hover:elevation-12"
            elevation="5"
            min-height="200"
          >
            <div class="d-flex justify-space-between align-center mb-2">
              <div class="d-flex align-center">
                <v-icon class="mr-2">
                  streamline-freehand:task-list-pin-1
                </v-icon>
                <h3 class="text-h6 font-weight-bold">{{ item.name }}</h3>
              </div>

              <DialogConfirmDelete
                @delete-success="loadItems"
                icon="mdi-close"
                size="20"
                :confirm-delete="async () => deleteItem(item)"
                :description="`Deseja remover '${item.name}'?`"
              />
            </div>

            <p class="text-body-2 text-medium-emphasis my-2">
              {{ item.description }}
            </p>

            <div class="w-100 d-flex justify-start my-2">
              <v-icon class="mr-2"> streamline-freehand:face-id-male-1 </v-icon>
              {{ item.person?.name }}
            </div>

            <div class="w-100 d-flex justify-start my-2">
              <v-icon class="mr-2"> streamline-freehand:calendar-grid </v-icon>
              {{
                DateFormatter.formatWithTime(item.createdAt).replace(",", " às")
              }}
            </div>

            <div
              class="d-flex justify-space-between align-center pt-3 mt-auto border-t border-opacity-10"
            >
              <div class="d-flex flex-column align-center">
                <span class="text-caption text-medium-emphasis">Preço</span>
                <span class="text-subtitle-1 font-weight-bold"
                  >R$ {{ item.price }}</span
                >
              </div>

              <div class="d-flex flex-column align-center">
                <span class="text-caption text-medium-emphasis">Categoria</span>

                <v-chip
                  class="text-subtitle-2 font-weight-bold text-center"
                  :color="item.category?.color"
                  >{{ item.category?.name }}</v-chip
                >
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <div class="d-flex justify-center mt-5" v-else-if="loading">
        <v-progress-circular size="70" indeterminate width="7" />
      </div>

      <div class="d-flex justify-center mt-5" v-else>
        <p>Nenhum item encontrado nessa seção :(</p>
      </div>
    </v-container>

    <div
      class="pa-4 d-flex flex-column flex-sm-row justify-space-between align-center mt-6 rounded-lg bg-surface gap-4"
    >
      <div class="text-body-2 text-medium-emphasis">
        Página {{ page }} de {{ pageCount }} — Mostrando {{ items.length }} de
        {{ itemsLength }} itens
      </div>

      <div class="d-flex align-center gap-3">
        <v-select
          v-model="itemsPerPage"
          :items="itemsPerPageOptions"
          item-title="label"
          item-value="value"
          hide-details
          density="compact"
          class="rounded-lg bg-surface"
          elevation="5"
          variant="solo-filled"
          style="max-width: 120px"
        />

        <v-pagination
          v-model="page"
          :length="pageCount"
          rounded="circle"
          variant="text"
          color="primary"
          density="comfortable"
        />
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { http } from "@/services/http/axios/http";
import type { IExpense } from "@/services/http/expense/i-expense";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete.vue";
import { notify } from "@/services/http/notify";
import { errorMessages } from "@/services/http/error-messages";
import vuetify from "@/plugins/vuetify";
import type { Header, Options } from "@/components/tables/BaseDataTable.vue";
import { usePagination } from "@/composables/usePagination";
import { DateFormatter } from "@/utils/date-formatter";

const emit = defineEmits<{
  (
    e: "update:options",
    value: { page: number; itemsPerPage: number; sortBy: [] }
  ): void;
}>();
const editDialog = ref<{ open: boolean; item?: IExpense }>({
  open: false,
  item: undefined,
});
const isMobile = computed(() => vuetify.display.mobile.value);
const loading = ref(false);
const items = ref<IExpense[]>([
  {
    id: 1,
    name: "Pizza",
    price: 70.0,
    categoryId: 2,
    personId: 1,
    paymentMethodId: 1,
    person: {
      id: 1,
      name: "João Silva",
      userId: 1,
      createdAt: new Date("2024-06-10"),
      updatedAt: new Date("2024-06-10"),
    },
    category: {
      id: 2,
      color: "#FF5733",
      name: "Alimentação",
      description: "Despesas relacionadas a alimentação",
      createdAt: new Date("2024-06-10"),
      updatedAt: new Date("2024-06-10"),
    },
    createdAt: new Date("2024-06-08"),
    updatedAt: new Date("2024-06-08"),
    description: "Descrição da despesa exemplo",
    userId: 1,
  },
  {
    id: 2,
    name: "Sorvete",
    price: 20.0,
    categoryId: 2,
    personId: 1,
    paymentMethodId: 1,
    person: {
      id: 1,
      name: "João Silva",
      userId: 1,
      createdAt: new Date("2024-06-10"),
      updatedAt: new Date("2024-06-10"),
    },
    category: {
      id: 2,
      color: "#FF5733",
      name: "Alimentação",
      description: "Despesas relacionadas a alimentação",
      createdAt: new Date("2024-06-10"),
      updatedAt: new Date("2024-06-10"),
    },
    createdAt: new Date("2024-06-07"),
    updatedAt: new Date("2024-06-07"),
    description: "Descrição da despesa exemplo",
    userId: 1,
  },
  {
    id: 3,
    name: "Café da tarde",
    price: 50.0,
    categoryId: 2,
    personId: 1,
    paymentMethodId: 1,
    person: {
      id: 1,
      name: "João Silva",
      userId: 1,
      createdAt: new Date("2024-06-10"),
      updatedAt: new Date("2024-06-10"),
    },
    category: {
      id: 2,
      color: "#FF5733",
      name: "Alimentação",
      description: "Despesas relacionadas a alimentação",
      createdAt: new Date("2024-06-10"),
      updatedAt: new Date("2024-06-10"),
    },
    createdAt: new Date("2024-06-06"),
    updatedAt: new Date("2024-06-06"),
    description: "Descrição da despesa exemplo",
    userId: 1,
  },
  {
    id: 4,
    name: "Lanche",
    price: 80.0,
    categoryId: 2,
    personId: 1,
    paymentMethodId: 1,
    person: {
      id: 1,
      name: "João Silva",
      userId: 1,
      createdAt: new Date("2024-06-10"),
      updatedAt: new Date("2024-06-10"),
    },
    category: {
      id: 2,
      color: "#FF5733",
      name: "Alimentação",
      description: "Despesas relacionadas a alimentação",
      createdAt: new Date("2024-06-10"),
      updatedAt: new Date("2024-06-10"),
    },
    createdAt: new Date("2024-06-05"),
    updatedAt: new Date("2024-06-05"),
    description: "Descrição da despesa exemplo",
    userId: 1,
  },
]);
const itemsLength = ref<number>(0);
const filter = ref({
  acronym: undefined,
  name: undefined,
  uuidSegment: undefined,
});
const headers: Header[] = [
  { key: "uuidSegment", title: "Segmento", sortable: false, align: "start" },
  { key: "name", title: "Nome", sortable: false, align: "start" },
  { key: "cnpj", title: "CNPJ", sortable: false, align: "start" },
  { key: "price", title: "Preço", sortable: false, align: "start" },
  { key: "latitude", title: "Latitude", sortable: false, align: "start" },
  { key: "longitude", title: "Longitude", sortable: false, align: "start" },
  { key: "active", title: "Ativo", sortable: false, align: "center" },
  { key: "acoes", title: "Ações", sortable: false, align: "center" },
];
const { page, itemsPerPage, itemsPerPageOptions, pageCount, getValue } =
  usePagination({ items, headers, itemsLength }, emit);

const options = ref({
  itemsPerPage,
  page,
});

watch(
  [filter, options],
  () => {
    loadItems(options.value);
  },
  { deep: true }
);

onMounted(async () => {
  loadItems();
});

function openEditDialog(item: IExpense) {
  editDialog.value = { open: true, item };
}

async function loadItems(newOptions?: Options) {
  // const actuallyOptions = newOptions ? newOptions : options.value;
  // itemsPerPage.value = actuallyOptions.itemsPerPage as number;
  // page.value = actuallyOptions.page as number;
  // loading.value = true;
  // loading.value = true;
  // try {
  //   const response = await http.concessionaria.list({
  //     ...options.value,
  //     ...filter.value,
  //   });
  //   itemsLength.value = response.meta?.total;
  //   items.value = response.data;
  // } finally {
  //   loading.value = false;
  // }
}

async function deleteItem(concessionaria: IExpense) {
  // try {
  //   loading.value = true;
  //   await http.concessionaria.delete(concessionaria.id);
  //   notify("Vínculo de concessionária removido com sucesso.", "success");
  // } catch (error) {
  //   errorMessages.handler(error);
  // } finally {
  //   loading.value = false;
  // }
}
</script>

<style scoped>
.custom-card {
  transition: transform 0.2s ease;
}

.custom-card:hover {
  transform: translateY(-3px);
}

.custom-footer {
  background-color: transparent;
  backdrop-filter: blur(6px);
  border-radius: 0 0 12px 12px;
}

.footer-info {
  font-size: 0.9rem;
  font-weight: 500;
}
</style>

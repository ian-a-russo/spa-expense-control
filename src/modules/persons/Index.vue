<template>
  <PageHeader
    :width="isMobile ? '100%' : '75rem'"
    title="Pessoas"
    description="Gerenciamento de Pessoas"
    icon="streamline-freehand:business-management-agreement"
    class="mb-6"
  />

  <v-card
    class="w-100 pa-6 bg-surface d-flex flex-column gap-6"
    :rounded="isMobile ? '' : 'xl'"
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
        <DialogCreatePerson
          :familiarities="familiarities"
          @save="loadItems"
          @close="createDialog = false"
          :dialog="createDialog"
        />

        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          variant="flat"
          @click="createDialog = true"
          v-if="!vuetify.display.mobile.value"
        >
          Cadastrar
        </v-btn>
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
          class="pa-3"
        >
          <v-card
            @click="openEditDialog(item)"
            class="person-card fill-height rounded-xl bg-surface d-flex flex-column justify-space-between pa-4"
            elevation="3"
          >
            <div class="d-flex justify-space-between align-start mb-3">
              <div class="d-flex align-center">
                <v-avatar size="40" class="mr-3 bg-primary">
                  <v-icon color="white">
                    streamline-freehand:face-id-male-1
                  </v-icon>
                </v-avatar>

                <div>
                  <h3 class="text-subtitle-1 font-weight-bold mb-0">
                    {{ item.name }}
                  </h3>
                  <span class="text-caption text-medium-emphasis">
                    {{ item.familiarity?.name }}
                  </span>
                </div>
              </div>

              <DialogConfirmDelete
                @delete-success="loadItems"
                icon="mdi-close"
                size="18"
                :confirm-delete="async () => deleteItem(item)"
                :description="`Deseja remover a pessoa '${item.name}'?`"
              />
            </div>

            <v-divider class="my-2" />

            <div class="d-flex align-center text-body-2 text-medium-emphasis">
              <v-icon size="18" class="mr-2">
                streamline-freehand:calendar-grid
              </v-icon>
              <span>
                Nascimento:
                <strong class="text-high-emphasis">
                  {{ DateFormatter.formatWithoutTimezone(item.bornAt as any) }}
                </strong>
              </span>
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

      <DialogEditPerson
        :familiarities="familiarities"
        :edit-person="editDialog.item"
        @save="loadItems"
        @close="editDialog.open = false"
        :dialog="editDialog.open"
      />
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
import type { IPerson } from "@/services/http/person/i-person";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete.vue";
import { notify } from "@/services/http/notify";
import { errorMessages } from "@/services/http/error-messages";
import vuetify from "@/plugins/vuetify";
import type { Header, Options } from "@/components/tables/BaseDataTable.vue";
import { usePagination } from "@/composables/usePagination";
import { DateFormatter } from "@/utils/date-formatter";
import DialogEditPerson from "./components/DialogEditPerson.vue";
import DialogCreatePerson from "./components/DialogCreatePerson.vue";
import { httpCoordinator } from "@/services/http/axios/http-coordinator.http";
import type { IFamiliarity } from "@/services/http/familiarity/i-familiarity";

const emit = defineEmits<{
  (
    e: "update:options",
    value: { page: number; itemsPerPage: number; sortBy: [] }
  ): void;
}>();
const familiarities = ref<IFamiliarity[]>([]);
const createDialog = ref(false);
const editDialog = ref<{ open: boolean; item?: IPerson }>({
  open: false,
  item: undefined,
});
const isMobile = computed(() => vuetify.display.mobile.value);
const loading = ref(false);
const items = ref<IPerson[]>([]);
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

  familiarities.value = (await httpCoordinator.familiarity.list()) as any;
});

function openEditDialog(item: IPerson) {
  editDialog.value = { open: true, item };
}

async function loadItems(newOptions?: Options) {
  const actuallyOptions = newOptions ? newOptions : options.value;
  itemsPerPage.value = actuallyOptions.itemsPerPage as number;
  page.value = actuallyOptions.page as number;
  loading.value = true;
  try {
    const response = await httpCoordinator.person.list({
      ...options.value,
      ...filter.value,
      includes: "familiarity",
    });
    itemsLength.value = response.meta?.totalItems;
    items.value = response.data;
  } finally {
    loading.value = false;
  }
}

async function deleteItem(person: IPerson) {
  try {
    loading.value = true;
    await httpCoordinator.person.delete(person.id);
    notify("Pessoa removida com sucesso.", "success");
  } catch (error) {
    errorMessages.handler(error);
  } finally {
    loading.value = false;
  }
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

import { ref, computed, watch, unref, type Ref } from "vue";

export interface Header {
  key: string;
  title: string;
}

export function usePagination<T>(
  props: {
    items: Ref<T[]>;
    headers: Header[];
    itemsLength?: Ref<number>;
  },
  emit: (
    e: "update:options",
    value: { page: number; itemsPerPage: number; sortBy: [] }
  ) => void
) {
  const page = ref(1);
  const itemsPerPage = ref(10);
  const itemsPerPageOptions = [
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
    { label: "Todos", value: -1 },
  ];

  watch([page, itemsPerPage], () => {
    emit("update:options", {
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: [],
    });
  });

  const pageCount = computed(() => {
    const total = unref(props.itemsLength) ?? unref(props.items).length;
    if (itemsPerPage.value === -1) return 1;
    return Math.ceil(total / itemsPerPage.value);
  });

  function getValue(item: T, header: Header) {
    try {
      return eval(`item.${header?.key}`);
    } catch {
      return null;
    }
  }

  return {
    page,
    itemsPerPage,
    itemsPerPageOptions,
    pageCount,
    getValue,
  };
}

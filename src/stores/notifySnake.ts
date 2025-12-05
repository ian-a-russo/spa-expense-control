import { reactive } from "vue";

type Notify = {
  show?: boolean;
  title?: string;
  message: string;
  type: "info" | "error" | "success" | "warning";
};

export const notifySnake: Notify = reactive({
  show: false,
  title: "",
  message: "snak nofiy",
  type: "info",
});

export type { Notify };

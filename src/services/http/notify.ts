import { notifySnake } from "@/stores/notifySnake";

type typeMessage = "error" | "success" | "warning" | "info";

export function notify(message: string, type: typeMessage) {
  notifySnake.show = true;
  notifySnake.message = message;
  notifySnake.type = type;
}

import type { IErrorMessages } from "./i-http-error-messages";
import { notify } from "./notify";
import axios, { AxiosError } from "axios";

class ErrorMessages implements IErrorMessages {
  handler(error: unknown): void {
    if (!axios.isAxiosError(error)) {
      return notify("Erro inesperado.", "error");
    }

    const type = this.getType(error);
    const message = this.getMessages(error.response?.data?.message);

    return notify(message, type);
  }

  private getMessages(messages: string | Array<string>) {
    if (typeof messages == "string") return messages;
    if (!messages.length) return "Erro inesperado!";
    return messages?.join("/n");
  }

  private getType(error: AxiosError) {
    if (error.response?.status != 500) return "warning";
    return "error";
  }
}

export const errorMessages = new ErrorMessages();

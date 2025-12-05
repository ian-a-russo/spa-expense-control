import type { Events, IMittService } from "@/services/http/i-mitt.service";
import mitt from "mitt";

export class MittService implements IMittService {
  private eventBus = mitt<Events>();

  emit(event: keyof Events, value?: any): void {
    return this.eventBus.emit(event, value);
  }
  on(event: keyof Events, callback: () => any): void {
    return this.eventBus.on(event, callback);
  }
  off(event: keyof Events, callback: () => any): void {
    return this.eventBus.off(event, callback);
  }
}

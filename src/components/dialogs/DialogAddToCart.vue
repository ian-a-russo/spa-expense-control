<template>
  <v-dialog :model-value="dialog" max-width="700" :fullscreen="isMobile">
    <FormCart
      :loading="loading"
      :expense="expense"
      @save="createCartItem"
      @close="emit('close')"
    />
  </v-dialog>
</template>
<script lang="ts" setup>
import { isMobile } from "@/stores/mobile";
import { notify } from "@/services/notify";
import {
  HTTP_COORDINATOR,
  ERROR_MESSAGES,
  MITT_SERVICE,
} from "@/symbols/service.symbols";
import type { IErrorMessages } from "@/services/http/i-http-error-messages";
import type { IExpense } from "@/services/http/expense/i-expense";
import FormCart, {
  type CartForm,
} from "@/modules/cart/components/FormCart.vue";
import type { IMittService } from "@/services/http/i-mitt.service";
import type { IHttpCoordinator } from "@/services/http/i-http-coordinator";

const httpCoordinator = inject(HTTP_COORDINATOR) as IHttpCoordinator;
const eventBus = inject(MITT_SERVICE) as IMittService;
const errorMessages = inject(ERROR_MESSAGES) as IErrorMessages;
const loading = ref<boolean>(false);
const props = defineProps({
  expense: {
    type: Object as PropType<IExpense>,
    required: true,
  },
  dialog: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["create-success", "close"]);

async function createCartItem(cartForm: CartForm) {
  try {
    loading.value = true;

    await httpCoordinator.cartItem.create(
      {
        ...cartForm.cartItem,
        expenseId: props.expense.id,
      },
      cartForm.customization
    );
    notify("Produto adicionado ao carrinho!", "success");
    eventBus.emit("reload-cart-amount");
    emit("close");
    emit("create-success");
  } catch (error) {
    errorMessages.handler(error);
  } finally {
    loading.value = false;
  }
}
</script>

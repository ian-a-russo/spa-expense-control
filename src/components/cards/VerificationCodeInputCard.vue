<template>
  <v-card
    :width="isMobile ? '90%' : '27rem'"
    border="md"
    class="pa-8"
    elevation="10"
  >
    <v-card-text>
      <v-toolbar class="font-weight-medium text-h5 text-left">
        Confirme seu email
      </v-toolbar>
      <p class="opacity-60">
        Insira abaixo o código de 6 dígitos recebido na sua caixa de email.
      </p>
      <div v-if="inputError" class="error-text">{{ inputError }}</div>
      <v-otp-input
        v-model="verificationCodeInternal"
        @update:model-value="(val) => emit('update:modelValue', val)"
        length="6"
        variant="underlined"
        autofocus
      />
    </v-card-text>
    <v-card-actions class="d-flex justify-end mt-6 mb-3">
      <v-btn
        :loading="loading"
        color="blue"
        variant="flat"
        rounded="xl"
        @click="emit('validate-code', verificationCodeInternal)"
        :disabled="verificationCodeInternal.length < 6"
      >
        Continuar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { isMobile } from "@/stores/mobile";

const props = defineProps({
  loading: { type: Boolean, required: true },
  inputError: { type: String, required: true },
});

const verificationCodeInternal = ref("");

const emit = defineEmits(["validate-code", "update:modelValue"]);
</script>

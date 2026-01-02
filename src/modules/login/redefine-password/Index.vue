<template>
  <div
    v-if="!success"
    style="height: 100%"
    class="d-flex justify-center align-center bg-gradient ma-0 pa-0"
  >
    <v-card
      :width="isMobile ? '90%' : '27rem'"
      border="md"
      class="pa-8"
      elevation="10"
    >
      <v-card-text>
        <v-row>
          <v-col md="12" class="text-center my-6">
            <p class="font-weight-medium text-h5">Insira a sua nova senha</p>
          </v-col>
        </v-row>
        <div v-if="inputError" class="error-text">{{ inputError }}</div>
        <div class="d-flex align-center">
          <v-text-field
            label="Senha"
            required
            variant="underlined"
            :type="showPassword ? 'text' : 'password'"
            v-model="newPassword"
            :rules="[required, minPasswordLength]"
          >
          </v-text-field>

          <v-btn
            icon
            color="transparent"
            variant="flat"
            rounded="xl"
            @click="showPassword = !showPassword"
          >
            <v-icon>
              {{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
            </v-icon>
          </v-btn>
        </div>

        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          :rules="[required, equals]"
          class="my-2"
          label="Repita a sua senha"
          variant="underlined"
          required
          v-model="confirmPassword"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-end mt-6 mb-3">
        <v-btn
          :disabled="loading"
          color="grey"
          variant="flat"
          rounded="md"
          @click="router.push('/login')"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="blue"
          :loading="loading"
          variant="flat"
          rounded="md"
          :disabled="!newPassword"
          @click="resetPassword"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <div
    v-else
    style="height: 100%"
    class="d-flex justify-center align-center bg-gradient ma-0 pa-0"
  >
    <VerificationCodeInputCard
      :input-error="inputError"
      :loading="loading"
      @validate-code="validate"
      v-if="!codeIsValid"
    />
    <TemporaryCard
      v-else
      title="Senha redefinida com successo!"
      icon="mdi-check-decagram"
      ending-message="Redirecionando usuário para tela de login..."
    />
  </div>
</template>
<script lang="ts" setup>
import { VerificationCodeType } from "@/services/http/auth/verification-code-type.enum";
import { httpCoordinator } from "@/services/http/axios/http-coordinator.http";
import { isMobile } from "@/stores/mobile";
import { userSessionStore } from "@/stores/user-session-store";
import { required } from "@/validations/required.rule";

const showPassword = ref<boolean>(false);
const confirmPassword = ref("");
const inputError = ref("");
const newPassword = ref("");
const loading = ref(false);
const success = ref(false);

onMounted(() => {
  if (!userSessionStore.user.email) router.push("/login");
});

const router = useRouter();
const codeIsValid = ref<boolean>(false);

async function validate(verificationCode: string) {
  try {
    loading.value = true;

    await httpCoordinator.auth.validateVerificationCode(
      verificationCode,
      {
        ...userSessionStore.user,
      },
      newPassword.value
    );

    codeIsValid.value = true;

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  } catch (error: any) {
    inputError.value = error.response.data.message;
  } finally {
    loading.value = false;
  }
}

async function resetPassword() {
  try {
    loading.value = true;

    await httpCoordinator.auth.createVerificationCode(
      { ...userSessionStore.user, password: newPassword.value },
      VerificationCodeType.reset_password
    );
    success.value = true;
  } catch (error: any) {
    inputError.value = error.response.data.message;
  } finally {
    loading.value = false;
  }
}

function equals(value: any) {
  return value == newPassword.value || "As senhas não conhecidem!";
}

function minPasswordLength(value: any) {
  return value?.length >= 8 || "A senha deve possuir pelo menos 8 caracteres!";
}
</script>

<style scoped>
.router {
  color: #2a9af3 !important;
}

.router:hover {
  color: #88c9ff !important;
}
</style>

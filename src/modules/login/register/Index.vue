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
        <v-form v-model="valid" ref="form">
          <v-toolbar class="font-weight-medium text-h5 text-left">
            Criar conta
          </v-toolbar>
          <div v-if="inputError" class="error-text">{{ inputError }}</div>
          <v-text-field
            autofocus
            class="my-2"
            :rules="[required]"
            variant="underlined"
            label="Nome"
            required
            v-model="user.name"
          />
          <v-text-field
            :rules="[required]"
            class="my-2"
            variant="underlined"
            label="Email"
            required
            v-model="user.email"
          />
          <div class="d-flex align-center">
            <v-text-field
              label="Senha"
              required
              variant="underlined"
              :type="showPassword ? 'text' : 'password'"
              v-model="user.password"
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
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end mt-6 mb-3">
        <v-btn
          :disabled="loading"
          variant="flat"
          color="grey"
          rounded="md"
          @click="router.push('/login')"
        >
          Voltar
        </v-btn>
        <v-btn
          :loading="loading"
          color="blue"
          variant="flat"
          rounded="md"
          @click="nextStep"
          :disabled="!valid"
        >
          Continuar
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
      :verification-code="verificationCode"
      @validate-code="validate"
      @update:model-value="(value: string) => (verificationCode = value)"
      v-if="!codeIsValid"
    />
    <TemporaryCard
      v-else
      title="Conta criada com sucesso!"
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
import { minPasswordLength } from "@/validations/min-password-length.rule";
import { required } from "@/validations/required.rule";

const verificationCode = ref("");
const codeIsValid = ref<boolean>(false);
const user = ref({
  password: "",
  email: "",
  name: "",
});
const success = ref(false);
const showPassword = ref<boolean>(false);
const confirmPassword = ref("");
const inputError = ref("");
const router = useRouter();
const loading = ref(false);
const form = ref();
const valid = ref<boolean>();

async function validate() {
  try {
    loading.value = true;

    await httpCoordinator.auth.validateVerificationCode(
      verificationCode.value,
      userSessionStore.user
    );

    codeIsValid.value = true;

    setTimeout(() => {
      goToLogin();
    }, 1200);
  } catch (error: any) {
    inputError.value = error.response.data.message;
  } finally {
    loading.value = false;
  }
}

function goToLogin() {
  router.push("/login");
}

async function nextStep() {
  try {
    const { valid } = await form.value.validate();
    if (!valid) return;

    loading.value = true;
    await httpCoordinator.auth.createVerificationCode(
      user.value,
      VerificationCodeType.new_account
    );

    userSessionStore.setUser({ ...user.value, role: "user" });
    success.value = true;
  } catch (error: any) {
    inputError.value = error.response.data.message;
  } finally {
    loading.value = false;
  }
}

function equals(value: any) {
  return value == user.value.password || "As senhas não conhecidem!";
}
</script>

<style scoped>
.router {
  text-decoration: none !important;
  color: #2a9af3 !important;
}

.router:hover {
  color: #88c9ff !important;
}
</style>

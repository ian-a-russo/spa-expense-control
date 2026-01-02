<template>
  <div
    v-if="!emailIsValid"
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
        <v-toolbar class="font-weight-medium text-h5 text-left">
          Fazer Login
        </v-toolbar>
        <div v-if="inputError" class="error-text">{{ inputError }}</div>
        <v-text-field
          autofocus
          class="my-2"
          variant="underlined"
          required
          v-model="userEmail"
        >
          <template #label>
            <v-icon>mdi-account</v-icon>
            Email
          </template>
        </v-text-field>
        <p>
          Não possui uma conta?
          <router-link to="/register" class="router">
            Crie uma agora!
          </router-link>
        </p>
      </v-card-text>
      <v-card-actions class="d-flex justify-end mt-6 mb-3">
        <v-btn
          :loading="loading"
          color="blue"
          variant="flat"
          rounded="md"
          :disabled="!userEmail"
          @click="continueToNextStep"
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
    <v-card
      :width="isMobile ? '90%' : '27rem'"
      border="md"
      class="pa-8"
      elevation="10"
    >
      <v-card-text>
        <v-toolbar class="font-weight-medium text-h5 text-left">
          Insira a sua senha
        </v-toolbar>
        <div v-if="inputError" class="error-text">{{ inputError }}</div>
        <div class="d-flex align-center">
          <v-text-field
            autofocus
            class="my-2"
            :type="showPassword ? 'text' : 'password'"
            variant="underlined"
            required
            v-model="userPassword"
          >
            <template #label>
              <v-icon>mdi-lock</v-icon>
              Senha
            </template>
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
        <p>
          Esqueceu sua senha?

          <router-link to="/redefine-password" class="router">
            Redefine-a agora!
          </router-link>
        </p>
      </v-card-text>
      <v-card-actions class="d-flex justify-end mt-6 mb-3">
        <v-btn
          :disabled="loading"
          color="grey"
          variant="flat"
          rounded="md"
          @click="returnToPreviousPage"
        >
          Voltar
        </v-btn>
        <v-btn
          color="blue"
          :loading="loading"
          variant="flat"
          rounded="md"
          :disabled="!userPassword"
          @click="login"
        >
          Continuar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import { httpCoordinator } from "@/services/http/axios/http-coordinator.http";
import { isMobile } from "@/stores/mobile";
import {
  userSessionStore,
  type UserOptions,
} from "@/stores/user-session-store";

const emailIsValid = ref(false);
const inputError = ref("");
const userEmail = ref("");
const loading = ref(false);
const showPassword = ref<boolean>(false);
const router = useRouter();
const userPassword = ref("");

onMounted(() => {
  window.addEventListener("keydown", handleEnterKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEnterKey);
});

function handleEnterKey(e: KeyboardEvent) {
  if (e.key !== "Enter") return;

  if (!emailIsValid.value) {
    continueToNextStep();
    return;
  }

  if (userPassword.value && !loading.value) {
    login();
  }
}

async function continueToNextStep() {
  try {
    loading.value = true;
    await httpCoordinator.auth.checkIfUserEmailExists(userEmail.value);

    userSessionStore.setUserEmail(userEmail.value);
    emailIsValid.value = true;
    inputError.value = "";
  } catch (error: any) {
    inputError.value = error.response.data.message;
  } finally {
    loading.value = false;
  }
}

async function login() {
  try {
    loading.value = true;

    const token = await httpCoordinator.auth.login(
      userSessionStore.user.email as string,
      userPassword.value
    );

    userSessionStore.setToken(token);

    const user = await httpCoordinator.auth.me();

    userSessionStore.setUser(user as UserOptions);

    router.push("/catalog");
  } catch (e) {
    inputError.value = "Conta ou senha incorreta.";
  } finally {
    loading.value = false;
  }
}

function returnToPreviousPage() {
  userSessionStore.logout();
  userPassword.value = "";
  emailIsValid.value = false;
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

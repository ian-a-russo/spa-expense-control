import { createApp } from "vue";
import App from "./App.vue";
import { registerPlugins } from "./plugins";
import { userSessionStore } from "./stores/user-session-store";
import canDirective from "@/support/directives/can";
import "@/styles/global.css";

const app = createApp(App);
registerPlugins(app);
userSessionStore.hydrate();
app.use(canDirective);
app.mount("#app");

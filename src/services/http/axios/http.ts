import { userSessionStore } from "@/stores/user-session-store";
import axios from "axios";
import router from "@/router";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = userSessionStore.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      userSessionStore.logout();
      router.push("/login");
    }
    if (error.response?.status === 403) {
      router.push("/expenses");
    }
    return Promise.reject(error);
  }
);

export { http };

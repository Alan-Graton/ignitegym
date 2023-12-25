import axios from "axios";

import { AppError } from "@/utils/AppError";

const api = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/`,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(
        new AppError("Erro no servidor. Tente de novo mais tarde.")
      );
    }
  }
);

export { api };

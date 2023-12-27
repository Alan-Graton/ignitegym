import axios, { AxiosError, AxiosInstance } from "axios";

import { AppError } from "@/utils/AppError";
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@/storage/storageAuthToken";

type SignOut = () => void;

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

interface PromiseType {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

const api = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}`,
}) as APIInstanceProps;

let failedQeue: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      const requestErrorMessage = requestError.response.data?.message;

      // Requisição não autorizada
      if (requestError?.response?.status === 401) {
        if (
          requestErrorMessage === "token.expired" ||
          requestErrorMessage === "token.invalid"
        ) {
          const getTokens = await storageAuthTokenGet();

          if (!getTokens?.refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          // Adicionando requisições na fila de execução
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQeue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Berear ${token}`,
                  };

                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          // Buscando novos tokens, configurando, salvando e
          // executando as requisições passadas com o novo token
          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("sessions/refresh-token", {
                refresh_token: getTokens.refresh_token,
              });

              await storageAuthTokenSave({
                token: data.token,
                refresh_token: data.refresh_token,
              });

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              originalRequestConfig.headers = {
                Authorization: `Berear ${data.token}`,
              };
              api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

              failedQeue.forEach((request) => {
                request.onSuccess(data.token);
              });

              console.log("\n\nToken Atualizado");

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              failedQeue.forEach((request) => {
                request.onFailure(error);
              });

              signOut();

              reject(error);
            } finally {
              isRefreshing = false;
              failedQeue = [];
            }
          });
        }

        signOut();
      }

      // Verificanado se é um erro tratado ou não
      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(
          new AppError("Erro no servidor. Tente de novo mais tarde.")
        );
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };

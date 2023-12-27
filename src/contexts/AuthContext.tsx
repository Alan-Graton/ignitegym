import React, { useState } from "react";

import { api } from "@/services/api";

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@/storage/storageUser";

import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@/storage/storageAuthToken";

import { UserDTO } from "@/dtos/UserDTO";

export const AuthContext = React.createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export interface AuthContextDataProps {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isFetchingUserData: boolean;
  setIsFetchingUserData: (state: boolean) => void;
  updateUserProfile: (updatedUser: UserDTO) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isFetchingUserData, setIsFetchingUserData] = useState<boolean>(true);
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setUser(userData);
  }

  async function storageUserAndTokenSave(
    user: UserDTO,
    token: string
  ): Promise<void> {
    try {
      setIsFetchingUserData(true);

      await storageUserSave(user);
      await storageAuthTokenSave(token);
    } catch (error) {
      console.error(
        "\n\n[AuthContext] storageUserAndTokenSave FAILED: ",
        error
      );
      throw error;
    } finally {
      setIsFetchingUserData(false);
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    try {
      const { data } = await api.post("sessions", { email, password });

      if (data.user && data.token) {
        setIsFetchingUserData(true);

        await storageUserAndTokenSave(data.user, data.token);
        await userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      console.error("\n\n[AuthContext] signIn FAILED: ", error);
      throw error;
    } finally {
      setIsFetchingUserData(false);
    }
  }

  async function signOut(): Promise<void> {
    try {
      setIsFetchingUserData(true);
      setUser({} as UserDTO);

      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      console.error("\n\n[AuthContext] signOut FAILED: ", error);
      throw error;
    } finally {
      setIsFetchingUserData(false);
    }
  }

  async function updateUserProfile(updatedUser: UserDTO) {
    try {
      setUser((prevState) => (prevState = updatedUser));

      await storageUserSave(updatedUser);
    } catch (error) {
      console.error("\n\n[AuthContext] updateUserProfile FAILED: ", error);
      throw error;
    }
  }

  async function loadUserData(): Promise<void> {
    try {
      setIsFetchingUserData(true);

      const loggedUser = await storageUserGet();
      const getToken = await storageAuthTokenGet();

      if (getToken && loggedUser) {
        userAndTokenUpdate(loggedUser, getToken);
      }
    } catch (error) {
      console.error("\n\n[AuthContext] loadUserData FAILED: ", error);
      throw error;
    } finally {
      setIsFetchingUserData(false);
    }
  }

  React.useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isFetchingUserData,
        setIsFetchingUserData,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

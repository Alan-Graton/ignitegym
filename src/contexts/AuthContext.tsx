import React, { useState } from "react";

import { api } from "@/services/api";

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@/storage/storageUser";

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
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isFetchingUserData, setIsFetchingUserData] = useState<boolean>(true);
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("sessions", { email, password });

      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      console.error("\n\n[AuthContext] SignIn Error: ", error);
      throw error;
    }
  }

  async function signOut() {
    try {
      await storageUserRemove();
    } catch (error) {
      console.error("\n\n[AuthContext] SignOut Error: ", error);
    }
  }

  async function loadUserData() {
    try {
      const loggedUser = await storageUserGet();

      if (loggedUser) {
        setUser(loggedUser);
      }
    } catch (error) {
      console.error("\n\n[AuthContext] Load user data Error: ", error);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

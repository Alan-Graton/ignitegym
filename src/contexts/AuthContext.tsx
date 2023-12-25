import React from "react";

import { UserDTO } from "@/dtos/UserDTO";

export const AuthContext = React.createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export interface AuthContextDataProps {
  user: UserDTO;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: "1",
          name: "Alan",
          email: "alan@email.com",
          picture: "avatar.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

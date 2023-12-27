import React from "react";

const DEFAULT_VALUE = {
  user: {
    email: "",
    password: "",
    avatar: "",
  },
  setUser: () => {},
};

/**
 * @deprecated - Use **AuthContext** instead
 */
export const UserContext = React.createContext<IUserContext>(DEFAULT_VALUE);

/**
 * @deprecated - Use **AuthProvider** instead
 */
export function UserProvider({ children }: Props) {
  const [user, setUser] = React.useState<IUser>(DEFAULT_VALUE.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

interface IUser {
  email: string;
  password: string;
  avatar: string;
}

interface IUserContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

interface Props {
  children: React.ReactNode;
}

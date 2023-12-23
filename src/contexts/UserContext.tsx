import React from "react";

const DEFAULT_VALUE = {
  user: {
    email: "",
    password: "",
    picture: "",
  },
  setUser: () => {},
  selectedPicture: null,
  setSelectedPicture: () => {},
};

export const UserContext = React.createContext<IUserContext>(DEFAULT_VALUE);

export function UserProvider({ children }: Props) {
  const [user, setUser] = React.useState<IUser>(DEFAULT_VALUE.user);
  /**
   * @deprecated - Use [user.picture] instead
   */
  const [selectedPicture, setSelectedPicture] = React.useState<string | null>(
    null
  );

  return (
    <UserContext.Provider
      value={{ user, setUser, selectedPicture, setSelectedPicture }}
    >
      {children}
    </UserContext.Provider>
  );
}

interface IUser {
  email: string;
  password: string;
  picture: string;
}

interface IUserContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  selectedPicture: string | null;
  setSelectedPicture: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Props {
  children: React.ReactNode;
}

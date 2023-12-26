import React from "react";

import { AuthContext, AuthContextDataProps } from "@/contexts/AuthContext";

export function useAuthContext(): AuthContextDataProps {
  const context = React.useContext(AuthContext);

  return context;
}

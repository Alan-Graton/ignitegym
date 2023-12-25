import React from "react";

import { AuthContext } from "@/contexts/AuthContext";

export function useAuthContext() {
  const context = React.useContext(AuthContext);

  return context;
}

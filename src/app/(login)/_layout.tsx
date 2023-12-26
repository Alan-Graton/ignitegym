import { Redirect, Stack } from "expo-router";

import { useAuthContext } from "@/hooks/useAuthContext";

export default function LoginLayout() {
  const { user } = useAuthContext();

  if (user.id) return <Redirect href="/home/" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}

import React from "react";
import { router, Slot } from "expo-router";
import { NativeBaseProvider, Box, Center } from "native-base";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { ExerciseProvider } from "@/contexts/ExerciseContext";

import { useAuthContext } from "@/hooks/useAuthContext";

import { AppLoader } from "@/components/AppLoader";

import { THEME } from "@/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  const AppIsBuilding = () => {
    return (
      <Center flexGrow={1} bg="gray.700">
        <AppLoader size="lg" />
      </Center>
    );
  };

  // TODO: Test this
  const AppContent = () => {
    const { user } = useAuthContext();

    console.log("\n\n[Root Layout - AppContent] User: ", user);

    React.useEffect(() => {
      router.push(user.id ? "/home/" : "/(login)");
    }, [user]);

    return (
      <Box flex={1} bg="gray.700">
        <Slot />
        <StatusBar
          animated
          translucent
          style="light"
          backgroundColor="transparent"
        />
      </Box>
    );
  };

  return (
    <>
      <NativeBaseProvider theme={THEME}>
        <AuthProvider>
          <UserProvider>
            <ExerciseProvider>
              {fontsLoaded ? <AppContent /> : <AppIsBuilding />}
            </ExerciseProvider>
          </UserProvider>
        </AuthProvider>
      </NativeBaseProvider>
    </>
  );
}

import { Slot } from "expo-router";

import { StatusBar } from "expo-status-bar";

import { UserProvider } from "@/contexts/UserContext";
import { ExerciseProvider } from "@/contexts/ExerciseContext";

import { NativeBaseProvider, Box, Center } from "native-base";

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

  const AppContent = () => {
    return (
      <Box flex={1} bg="gray.700">
        <UserProvider>
          <ExerciseProvider>
            <Slot />
          </ExerciseProvider>
        </UserProvider>
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
        {fontsLoaded ? <AppContent /> : <AppIsBuilding />}
      </NativeBaseProvider>
    </>
  );
}

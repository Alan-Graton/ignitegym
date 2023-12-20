import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { AppLoader } from "@/components/AppLoader";

import { NativeBaseProvider, Box } from "native-base";
import { THEME } from "@/theme";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  const AppSlot = () => {
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
        {fontsLoaded ? <AppSlot /> : <AppLoader />}
      </NativeBaseProvider>
    </>
  );
}

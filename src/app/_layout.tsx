import { Slot } from "expo-router";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { THEME } from "@/theme";
import { AppLoader } from "@/components/AppLoader";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <>
      <NativeBaseProvider theme={THEME}>
        {fontsLoaded ? <Slot /> : <AppLoader />}
        <StatusBar
          translucent
          animated
          backgroundColor="transparent"
          style="light"
        />
      </NativeBaseProvider>
    </>
  );
}

import { Slot } from "expo-router";

import { NativeBaseProvider } from "native-base";

export default function RootLayout() {
  return (
    <>
      <NativeBaseProvider>
        <Slot />
      </NativeBaseProvider>
    </>
  );
}

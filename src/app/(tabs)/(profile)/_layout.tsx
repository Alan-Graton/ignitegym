import { AppSimpleScreenHeader } from "@/components/AppSimpleScreenHeader";
import { Tabs, Slot } from "expo-router";

import { Box, Center, Text } from "native-base";

export default function ProfileLayout() {
  return (
    <>
      <Tabs.Screen
        options={{
          header: () => <AppSimpleScreenHeader title="Perfil" />,
        }}
      />
      <Slot />
    </>
  );
}

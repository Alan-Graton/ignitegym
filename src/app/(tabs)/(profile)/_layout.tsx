import { AppSimpleScreenHeader } from "@/components/AppSimpleScreenHeader";
import { Tabs, Slot } from "expo-router";

export default function ProfileLayout() {
  return (
    <>
      <Tabs.Screen
        options={{
          headerShown: true,
          header: () => <AppSimpleScreenHeader title="Perfil" />,
        }}
      />
      <Slot />
    </>
  );
}

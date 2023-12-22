import { AppSimpleScreenHeader } from "@/components/AppSimpleScreenHeader";
import { Tabs, Slot } from "expo-router";

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

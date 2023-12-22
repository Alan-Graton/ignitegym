import { AppSimpleScreenHeader } from "@/components/AppSimpleScreenHeader";
import { Tabs, Slot } from "expo-router";

export default function HistoryLayout() {
  return (
    <>
      <Tabs.Screen
        options={{
          header: () => (
            <AppSimpleScreenHeader title="Histórico de Exercícios" />
          ),
        }}
      />
      <Slot />
    </>
  );
}

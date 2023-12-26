import React from "react";
import { useExerciseContext } from "@/hooks/useExerciseContext";

import { Slot, Tabs } from "expo-router";

import { Header } from "./components/Header";

export default function HomeLayout() {
  const { selectedExerciseID } = useExerciseContext();

  return (
    <>
      <Tabs.Screen
        options={{
          headerShown: selectedExerciseID ? false : true,
          header: () => <Header />,
        }}
      />
      <Slot />
    </>
  );
}

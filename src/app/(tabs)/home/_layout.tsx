import React, { useContext } from "react";
import { ExerciseContext } from "@/contexts/ExerciseContext";

import { Slot, Tabs } from "expo-router";

import { Header } from "./components/Header";

export default function HomeLayout() {
  const { selectedExercise } = useContext(ExerciseContext);

  return (
    <>
      <Tabs.Screen
        options={{
          headerShown: selectedExercise ? false : true,
          header: () => <Header />,
        }}
      />
      <Slot />
    </>
  );
}

import React, { useState } from "react";
import { ExerciseContext } from "@/contexts/ExerciseContext";

import { router } from "expo-router";

import { HStack, VStack, FlatList, Heading, Text } from "native-base";

import { Group } from "./components/Group";
import { ExerciseCard } from "./components/ExerciseCard";

export default function Home() {
  const { setSelectedExercise } = React.useContext(ExerciseContext);

  const [groups, setGroups] = useState<string[]>([
    "costas",
    "bíceps",
    "tríceps",
    "ombro",
  ]);
  const [selectedGroup, setSelectedGroup] = useState<string>("costas");
  const [exercises, setExercises] = useState<string[]>([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terras",
  ]);

  function handleOpenExerciseDetails(item: string) {
    setSelectedExercise((prevState) => (prevState = item));
    router.push("/(tabs)/home/exercise_details");
  }

  return (
    <VStack flex={1} bg="gray.700">
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup.toLowerCase() === item.toLowerCase()}
            onPress={() => setSelectedGroup((prevState) => (prevState = item))}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard
              title={item}
              onPress={() => handleOpenExerciseDetails(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}

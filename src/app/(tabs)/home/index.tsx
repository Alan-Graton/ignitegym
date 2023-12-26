import React, { useState } from "react";
import { useExerciseContext } from "@/hooks/useExerciseContext";

import { router, useFocusEffect } from "expo-router";

import { HStack, VStack, FlatList, Heading, Text, useToast } from "native-base";

import { api } from "@/services/api";
import { ExerciseDTO } from "@/dtos/ExercisesDTO";

import { AppLoader } from "@/components/AppLoader";

import { Group } from "./components/Group";
import { ExerciseCard } from "./components/ExerciseCard";

import { AppError } from "@/utils/AppError";

export default function Home() {
  const toast = useToast();

  const { setSelectedExerciseID } = useExerciseContext();

  const [loading, setLoading] = useState<boolean>(true);

  const [groups, setGroups] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>(
    groups[0] || "antebraço"
  );
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

  function handleOpenExerciseDetails(id: string) {
    setSelectedExerciseID((prevState) => (prevState = id));
    router.push(`/(tabs)/home/exercise_details/${id}`);
  }

  async function fetchGroups() {
    try {
      const { data } = await api.get("groups");

      setGroups(data);
    } catch (error) {
      console.error("\n\n[Home] fetchGroups FAILED: ", error);
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares.";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setLoading(true);
      const { data } = await api.get(`exercises/bygroup/${selectedGroup}`);

      setExercises(data);
    } catch (error) {
      console.error("\n\n[Home] fetchExercises FAILED: ", error);
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios.";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchExercisesByGroup();
    }, [selectedGroup])
  );

  return (
    <VStack flex={1} bg="gray.700">
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup?.toLowerCase() === item.toLowerCase()}
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

      <AppLoader loading={loading} size="lg" />

      {!loading && (
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                exercise={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
}

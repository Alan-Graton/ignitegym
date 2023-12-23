import React from "react";

import { VStack, Heading, SectionList, Text } from "native-base";

import { HistoryCard } from "./components/HistoryCard";

export default function HistoryProfile() {
  const [exercises, setExercises] = React.useState<
    { title: string; data: any[] }[]
  >([
    { title: "22.08.22", data: ["Puxada Frontal", "Remada unilateral"] },
    { title: "27.08.22", data: ["Puxada frontal"] },
  ]);

  return (
    <>
      <VStack flex={1} bg="gray.700">
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <HistoryCard />}
          renderSectionHeader={({ section }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              fontFamily="heading"
              mt={10}
              m={3}
            >
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {"\n"}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </>
  );
}

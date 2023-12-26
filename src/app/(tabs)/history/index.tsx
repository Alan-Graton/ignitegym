import React, { useState } from "react";
import { useFocusEffect } from "expo-router";

import { VStack, Heading, SectionList, Text, useToast } from "native-base";

import { api } from "@/services/api";
import { HistoryByDay } from "@/dtos/HistoryByDayDTO";

import { AppLoader } from "@/components/AppLoader";

import { HistoryCard } from "./components/HistoryCard";

import { AppError } from "@/utils/AppError";

export default function HistoryProfile() {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<HistoryByDay[]>([]);

  async function fetchHistory() {
    try {
      setLoading(true);

      const { data } = await api.get("history");

      setHistory(data);
    } catch (error) {
      console.error("\n\n[Home] fetchGroups FAILED: ", error);
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico.";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <>
      <VStack flex={1} bg="gray.700">
        <SectionList
          sections={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard register={item} />}
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
            history.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <>
              <AppLoader loading={loading} size="lg" />
              {!loading && (
                <Text color="gray.100" textAlign="center">
                  Não há exercícios registrados ainda. {"\n"}
                  Vamos fazer exercícios hoje?
                </Text>
              )}
            </>
          )}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </>
  );
}

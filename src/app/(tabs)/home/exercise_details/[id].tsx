import React from "react";
import { useExerciseContext } from "@/hooks/useExerciseContext";

import { useGlobalSearchParams } from "expo-router";

import {
  VStack,
  Image,
  Box,
  HStack,
  Text,
  ScrollView,
  useToast,
  Skeleton,
} from "native-base";

import { api } from "@/services/api";

import { AppButton } from "@/components/AppButton";

import { AppError } from "@/utils/AppError";

import SeriesSvg from "@/assets/series.svg";
import RepetitionsSvg from "@/assets/repetitions.svg";
import { AppLoader } from "@/components/AppLoader";

export default function selectedExerciseDetails() {
  const { id }: { id: string } = useGlobalSearchParams();

  const toast = useToast();

  const { selectedExerciseDetails, setSelectedExerciseDetails } =
    useExerciseContext();

  const [loading, setLoading] = React.useState<boolean>(true);

  async function fetchExerciseDetails() {
    try {
      setLoading(true);

      const { data } = await api.get(`exercises/${id}`);

      setSelectedExerciseDetails(data);
    } catch (error) {
      console.error(
        "\n\n[selectedExerciseDetails] fetchExerciseFetch FAILED: ",
        error
      );
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchExerciseDetails();
  }, [id]);

  return (
    <ScrollView flex={1} bg="gray.700" showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700" p={8}>
        {!selectedExerciseDetails?.demo ? (
          <Skeleton w="full" h={80} mb={3} rounded="lg" />
        ) : (
          <Box mb={3} rounded="lg" overflow="hidden">
            <Image
              source={{
                uri: `${api.defaults.baseURL}exercise/demo/${selectedExerciseDetails.demo}`,
              }}
              alt="Selected Exercise demo"
              w="full"
              h={80}
              resizeMode="cover"
            />
          </Box>
        )}

        <AppLoader loading={loading} />

        {!loading && (
          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml={2}>
                  {selectedExerciseDetails?.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml={2}>
                  {selectedExerciseDetails?.repetitions} repetições
                </Text>
              </HStack>
            </HStack>
            <AppButton title="Marcar como realizado" />
          </Box>
        )}
      </VStack>
    </ScrollView>
  );
}

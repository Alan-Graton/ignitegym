import React from "react";

import { VStack, Image, Box, HStack, Text } from "native-base";

import { AppButton } from "@/components/AppButton";

import SeriesSvg from "@/assets/series.svg";
import RepetitionsSvg from "@/assets/repetitions.svg";

export default function ExerciseDetails() {
  return (
    <VStack flex={1} bg="gray.700" p={8}>
      <Image
        source={{
          uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
        }}
        alt="Selected Exercise Image"
        w="full"
        h={80}
        mb={3}
        resizeMode="cover"
        rounded="lg"
      />

      <Box bg="gray.600" rounded="md" pb={4} px={4}>
        <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
          <HStack>
            <SeriesSvg />
            <Text color="gray.200" ml={2}>
              3 séries
            </Text>
          </HStack>

          <HStack>
            <RepetitionsSvg />
            <Text color="gray.200" ml={2}>
              12 repetições
            </Text>
          </HStack>
        </HStack>
        <AppButton title="Marcar como realizado" />
      </Box>
    </VStack>
  );
}

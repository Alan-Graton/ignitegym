import { router, Stack } from "expo-router";

import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack } from "native-base";

import { Feather } from "@expo/vector-icons";
import BodySvg from "@/assets/body.svg";

export default function ExerciseDetailsLayout() {
  function handleGoBack() {
    router.canGoBack() && router.back();
  }

  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerShown: true,
        header: () => (
          <VStack bg="gray.600" px={8} pt={5} safeArea>
            <TouchableOpacity onPress={handleGoBack}>
              <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
            </TouchableOpacity>

            <HStack
              justifyContent="space-between"
              mt={3.5}
              mb={3.5}
              alignItems="center"
            >
              <HStack>
                <Heading color="gray.100" fontSize="lg" flexShrink={1}>
                  Puxada frontal
                </Heading>
              </HStack>

              <HStack alignItems="center">
                <BodySvg />
                <Text color="gray.200" ml={1} textTransform="capitalize">
                  Costas
                </Text>
              </HStack>
            </HStack>
          </VStack>
        ),
      }}
    />
  );
}
import { router, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { Fab, Heading, HStack, Icon, Text, VStack } from "native-base";

import { TouchableOpacity } from "react-native";

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
          <VStack  pt={5} bg="gray.600" safeArea>
            <VStack bg="gray.600" px={8}>
              <TouchableOpacity onPress={handleGoBack}>
                <Icon
                  as={Feather}
                  name="arrow-left"
                  color="green.500"
                  size={6}
                />

                <HStack
                  justifyContent="space-between"
                  my={4}
                  mb={8}
                  alignItems="center"
                >
                  <Heading color="gray.100" fontSize="lg">
                    Puxada frontal
                  </Heading>

                  <HStack>
                    <Text color="gray.200" ml={1} textTransform="capitalize">
                      Costas
                    </Text>
                  </HStack>
                </HStack>
              </TouchableOpacity>
            </VStack>
          </VStack>
        ),
      }}
    />
  );
}

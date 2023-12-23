import React from "react";
import { ExerciseContext } from "@/contexts/ExerciseContext";

import { router, Slot, Tabs } from "expo-router";

import { TouchableOpacity } from "react-native";

import { HStack, VStack, Text, Icon, Heading } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";
import { AppUserPicture } from "@/components/AppUserPicture";

export default function HomeLayout() {
  const { selectedExercise, setSelectedExercise } =
    React.useContext(ExerciseContext);

  function handleGoBack() {
    if (router.canGoBack()) {
      setSelectedExercise(null);
      router.back();
    }
  }

  return (
    <>
      <Tabs.Screen
        options={{
          headerShown: selectedExercise ? false : true,
          header: () => (
            <HStack
              bg="gray.600"
              padding={6}
              height={117}
              alignItems="center"
              justifyContent="space-between"
              safeArea
            >
              <AppUserPicture w={50} h={50} />

              <VStack flex={1} ml={4}>
                <Text color="gray.100" fontSize="md">
                  Olá,
                </Text>
                <Heading color="gray.100" fontSize="md">
                  Alan Graton
                </Heading>
              </VStack>

              <TouchableOpacity onPress={handleGoBack}>
                <Icon
                  as={MaterialIcons}
                  name="logout"
                  color="gray.200"
                  size={6}
                />
              </TouchableOpacity>
            </HStack>
          ),
        }}
      />
      <Slot />
    </>
  );
}

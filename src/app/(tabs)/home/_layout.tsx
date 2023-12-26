import React, { useContext } from "react";
import { ExerciseContext } from "@/contexts/ExerciseContext";

import { router, Slot, Tabs } from "expo-router";

import { UserContext } from "@/contexts/UserContext";

import { TouchableOpacity } from "react-native";
import { HStack, VStack, Text, Icon, Heading } from "native-base";

import { storageUserRemove } from "@/storage/storageUser";

import { AppUserPicture } from "@/components/AppUserPicture";

import { MaterialIcons } from "@expo/vector-icons";

import { STATIC_USER_PICTURE } from "@/constants";

export default function HomeLayout() {
  const { selectedExercise, setSelectedExercise } = useContext(ExerciseContext);

  const { user } = useContext(UserContext);

  // TODO: Apply D.R.Y
  const handleUserPicture = user.picture ? user.picture : STATIC_USER_PICTURE;

  async function handleGoBack() {
    try {
      await storageUserRemove();

      if (router.canGoBack()) {
        setSelectedExercise(null);
        router.back();
      }
    } catch (error) {
      console.error("\n\n[Home] Signing Out Error: ", error);
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
              <AppUserPicture
                source={{ uri: handleUserPicture }}
                w={50}
                h={50}
              />

              <VStack flex={1} ml={4}>
                <Text color="gray.100" fontSize="md">
                  Olá,
                </Text>
                <Heading color="gray.100" fontSize="md" fontFamily="heading">
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

import React from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useExerciseContext } from "@/hooks/useExerciseContext";
import { router } from "expo-router";

import { HStack, Heading, Icon, VStack, Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AppUserPicture } from "@/components/AppUserPicture";

import { MaterialIcons } from "@expo/vector-icons";

import { handleUserAvatar } from "@/utils/handleUserAvatar";

export function Header() {
  const { user, signOut } = useAuthContext();
  const { setSelectedExerciseID, setSelectedExerciseDetails } =
    useExerciseContext();

  async function handleSignOut() {
    try {
      await signOut();

      setSelectedExerciseID(null);
      setSelectedExerciseDetails(null);

      router.canGoBack() ? router.back() : router.push("/(login)");
    } catch (error) {
      console.error("\n\n[Home] Signing Out Error: ", error);
    }
  }

  return (
    <HStack
      bg="gray.600"
      padding={6}
      height={117}
      alignItems="center"
      justifyContent="space-between"
      safeArea
    >
      <AppUserPicture source={handleUserAvatar(user)} w={50} h={50} />

      <VStack flex={1} ml={4}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleSignOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={6} />
      </TouchableOpacity>
    </HStack>
  );
}

import React from "react";
import { ExerciseContext } from "@/contexts/ExerciseContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { router } from "expo-router";

import { HStack, Heading, Icon, VStack, Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

import { storageUserRemove } from "@/storage/storageUser";

import { AppUserPicture } from "@/components/AppUserPicture";

import { MaterialIcons } from "@expo/vector-icons";

import defaultPicture from "@/assets/userPhotoDefault.png";

export function Header() {
  const { user } = useAuthContext();
  const { setSelectedExercise } = React.useContext(ExerciseContext);

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
    <HStack
      bg="gray.600"
      padding={6}
      height={117}
      alignItems="center"
      justifyContent="space-between"
      safeArea
    >
      <AppUserPicture
        source={user.picture ? { uri: user.picture } : defaultPicture}
        w={50}
        h={50}
      />

      <VStack flex={1} ml={4}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleGoBack}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={6} />
      </TouchableOpacity>
    </HStack>
  );
}

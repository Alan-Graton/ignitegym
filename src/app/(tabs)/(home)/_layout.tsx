import { router, Slot, Tabs } from "expo-router";

import { TouchableOpacity } from "react-native";
import { Box, HStack, VStack, Text } from "native-base";

import { AppUserPicture } from "@/components/AppUserPicture";

import { SignOut } from "phosphor-react-native";

export default function HomeLayout() {
  function handleGoBack() {
    router.canGoBack() && router.back();
  }

  return (
    <>
      <Tabs.Screen
        options={{
          header: () => (
            <HStack
              bg="gray.600"
              padding={3}
              height={125}
              alignItems="center"
              justifyContent="space-between"
              safeArea
            >
              <AppUserPicture w={50} h={50} ml={2} />

              <VStack flex={1} ml={4} padding={1}>
                <Text color="gray.100" fontSize="sm">
                  Olá,
                </Text>
                <Text color="gray.100" fontSize="md" fontFamily="heading">
                  Alan Graton
                </Text>
              </VStack>

              <Box mr={2}>
                <TouchableOpacity onPress={handleGoBack}>
                  <SignOut color="white" />
                </TouchableOpacity>
              </Box>
            </HStack>
          ),
        }}
      />
      <Slot />
    </>
  );
}

import { router, Slot, Tabs } from "expo-router";

import { TouchableOpacity } from "react-native";
import { Box, HStack, VStack, Text, Image } from "native-base";

import { SignOut } from "phosphor-react-native";

export default function HomeLayout() {
  function handleGoBack() {
    router.canGoBack() && router.back();
  }

  const GITHUB_USER_PIC = "https://github.com/Alan-Graton.png";

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
              <Image
                source={{ uri: GITHUB_USER_PIC }}
                width={50}
                height={50}
                ml={2}
                rounded="full"
                borderWidth={2}
                borderColor="gray.400"
                alt="Profile Picture"
              />

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

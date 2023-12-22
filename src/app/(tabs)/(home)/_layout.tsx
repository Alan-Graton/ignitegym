import { router, Slot, Tabs } from "expo-router";

import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HStack, VStack, Text, Icon, Heading } from "native-base";

import { AppUserPicture } from "@/components/AppUserPicture";

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

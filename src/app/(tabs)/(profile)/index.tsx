import React from "react";

import { Box, Center, VStack, HStack, Text } from "native-base";

export default function Profile() {
  return (
    <>
      <VStack flex={1} bg="gray.700" padding={6}>
        <Center>
          <Text color="white">Profile Screen Slot</Text>
        </Center>
      </VStack>
    </>
  );
}

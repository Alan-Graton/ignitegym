import React from "react";

import { Box, Center, HStack, VStack, Text } from "native-base";

export default function Home() {
  return (
    <>
      <VStack flex={1} bg="gray.700" padding={6}>
        <Center>
          <Text color="white">Home Screen Slot</Text>
        </Center>
      </VStack>
    </>
  );
}

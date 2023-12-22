import React from "react";

import { router } from "expo-router";

import { MaterialIcons } from "@expo/vector-icons";

import { HStack, VStack, Icon, Heading } from "native-base";

export function Header() {
  return (
    <HStack>
      <Icon as={MaterialIcons} name="arrow-back" />
      <Heading>Puxada Frontal</Heading>
      <VStack></VStack>
    </HStack>
  );
}

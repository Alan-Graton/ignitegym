import { Tabs } from "expo-router";

import { Box, Text, Center } from "native-base";

export default function HistoryLayout() {
  return (
    <Tabs.Screen
      options={{
        header: () => (
          <Box
            bg="gray.600"
            padding={4}
            height={125}
            justifyContent="center"
            safeArea
          >
            <Center>
              <Text color="gray.100" fontSize="lg" fontFamily="heading">
                Histórico de Exercícios
              </Text>
            </Center>
          </Box>
        ),
      }}
    />
  );
}

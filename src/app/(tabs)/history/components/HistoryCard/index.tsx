import { HistoryDTO } from "@/dtos/HistoryDTO";
import { HStack, VStack, Heading, Text } from "native-base";

interface Props {
  register: HistoryDTO;
}

export function HistoryCard({ register }: Props) {
  return (
    <HStack
      w="full"
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack flex={1} mr={5}>
        <Heading
          color="white"
          fontSize="md"
          fontFamily="heading"
          textTransform="capitalize"
          numberOfLines={1}
        >
          {register.group}
        </Heading>

        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {register.name}
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        {register.hour}
      </Text>
    </HStack>
  );
}

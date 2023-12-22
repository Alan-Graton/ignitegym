import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { Text, VStack, HStack, Image, Heading, Icon } from "native-base";

import exercise1 from "@/assets/exercise1.png";

interface Props extends TouchableOpacityProps {
  title: string;
}

export function ExerciseCard({ title, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={exercise1}
          alt="Exercise Image"
          w={16}
          h={16}
          rounded="md"
          mr={14}
        />

        <VStack flex={1}>
          <Heading color="white" fontSize="lg">
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}

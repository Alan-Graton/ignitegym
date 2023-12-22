import { Center, Text, Pressable, IPressableProps } from "native-base";

interface Props extends IPressableProps {
  name: string;
  isActive?: boolean;
}

export function Group({ name, isActive = false, ...rest }: Props) {
  return (
    <Pressable
      bg="gray.600"
      mr={3}
      w={24}
      h={10}
      rounded="md"
      justifyContent="center"
      alignItems="center"
      isPressed={isActive}
      _pressed={{
        borderColor: "green.500",
        borderWidth: 1,
      }}
      overflow="hidden"
      {...rest}
    >
      <Text
        color={isActive ? "green.500" : "gray.200"}
        textTransform="uppercase"
        fontSize="xs"
        bold
      >
        {name}
      </Text>
    </Pressable>
  );
}

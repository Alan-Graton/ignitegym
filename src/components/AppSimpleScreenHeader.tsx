import { Center, Heading } from "native-base";

interface Props {
  title: string;
}

export function AppSimpleScreenHeader({ title }: Props) {
  return (
    <Center bg="gray.600" pb={6} pt={10} safeArea>
      <Heading color="gray.100" fontSize="xl" fontFamily="heading">
        {title}
      </Heading>
    </Center>
  );
}

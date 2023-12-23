import { Center, Spinner, ISpinnerProps } from "native-base";

export function AppLoader({ ...rest }: ISpinnerProps) {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner color="green.500" {...rest} />
    </Center>
  );
}

import { Center, Spinner, ISpinnerProps } from "native-base";

interface Props extends ISpinnerProps {
  loading?: boolean;
}

export function AppLoader({ loading = true, ...rest }: Props) {
  return (
    <>
      {loading && (
        <Center flex={1} bg="gray.700">
          <Spinner animating={loading} color="green.500" {...rest} />
        </Center>
      )}
    </>
  );
}

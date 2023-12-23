import { Input, IInputProps, FormControl } from "native-base";

interface Props extends IInputProps {
  errorMessage?: string | null;
}

export function AppTextInput({
  errorMessage = null,
  isInvalid,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <Input
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        fontFamily="body"
        color="white"
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        cursorColor="#00B37E"
        _invalid={{
          borderWidth: 1,
          borderColor: "red.700",
          cursorColor: "#F75A68",
        }}
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "green.500",
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}

import { Text, ITextProps } from "native-base";

import { FieldError } from "react-hook-form";

interface Props extends ITextProps {
  error?: FieldError | undefined;
  message?: string;
}

export function AppTextError({ error, message, ...rest }: Props) {
  return (
    <>
      {error && (
        <Text color="red.300" {...rest}>
          {message}
        </Text>
      )}
    </>
  );
}

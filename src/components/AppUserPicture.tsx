import { Image, IImageProps } from "native-base";

export function AppUserPicture({ ...rest }: IImageProps) {
  return (
    <Image
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      alt="Profile Picture"
      {...rest}
    />
  );
}

import { Image, IImageProps } from "native-base";

export function AppUserPicture({ ...rest }: IImageProps) {
  const USER_PICTURE = "https://github.com/Alan-Graton.png";

  return (
    <Image
      source={{ uri: USER_PICTURE }}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      alt="Profile Picture"
      {...rest}
    />
  );
}

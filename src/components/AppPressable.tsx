import { Pressable } from "native-base";

interface Props {
  children: React.ReactNode;
}

export function AppPressable({ children }: Props) {
  return <Pressable>{children}</Pressable>;
}

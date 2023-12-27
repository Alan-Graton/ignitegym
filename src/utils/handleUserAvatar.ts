import { ImageSourcePropType } from "react-native";

import { api } from "@/services/api";
import { UserDTO } from "@/dtos/UserDTO";

import userPhotoDefault from "@/assets/userPhotoDefault.png";

export function handleUserAvatar(user: UserDTO): ImageSourcePropType {
  return user.avatar
    ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
    : userPhotoDefault;
}

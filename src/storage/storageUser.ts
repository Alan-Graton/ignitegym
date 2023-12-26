import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@/dtos/UserDTO";
import { USER_STORAGE } from "./storageConfig";

export async function storageUserSave(user: UserDTO) {
  try {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
  } catch (error) {
    console.error("\n\n[Storage User Save] Error: ", error);
  }
}

export async function storageUserRemove() {
  try {
    await AsyncStorage.removeItem(USER_STORAGE);
  } catch (error) {
    console.error("\n\n[Storage User Remove] Error: ", error);
  }
}

export async function storageUserGet() {
  try {
    const getUser = await AsyncStorage.getItem(USER_STORAGE);

    console.log("\n\nAsync Storage Response: ", getUser);

    const user: UserDTO = getUser ? JSON.parse(getUser) : [];

    return user;
  } catch (error) {
    console.error("\n\n[Storage User Get] Error: ", error);
  }
}

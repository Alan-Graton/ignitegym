import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "@/storage/storageConfig";

export async function storageAuthTokenSave(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
  } catch (error) {
    console.error("\n\n[Storage Auth Token Save] Error: ", error);
  }
}

export async function storageAuthTokenGet(): Promise<string | null | undefined> {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

    return token;
  } catch (error) {
    console.error("\n\n[Storage Auth Token Save] Error: ", error);
  }
}

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "@/storage/storageConfig";

interface StorageAuthTokenProps {
  token: string;
  refresh_token: string;
}

export async function storageAuthTokenSave({
  token,
  refresh_token,
}: StorageAuthTokenProps) {
  try {
    await AsyncStorage.setItem(
      AUTH_TOKEN_STORAGE,
      JSON.stringify({ token, refresh_token })
    );
  } catch (error) {
    console.error(
      "\n\n[storageAuthToken] storageAuthTokenSave FAILED: ",
      error
    );
  }
}

export async function storageAuthTokenGet(): Promise<
  { token: string; refresh_token: string } | undefined
> {
  try {
    const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

    const { token, refresh_token }: StorageAuthTokenProps = response
      ? JSON.parse(response)
      : [];

    return { token, refresh_token };
  } catch (error) {
    console.error("\n\n[storageAuthToken] storageAuthTokenGet FAILED: ", error);
    return;
  }
}

export async function storageAuthTokenRemove(): Promise<void> {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
  } catch (error) {
    console.error(
      "\n\n[storageAuthToken] storageAuthTokenRemove FAILED: ",
      error
    );
  }
}

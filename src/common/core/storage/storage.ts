import AsyncStorage
  from '@react-native-async-storage/async-storage';

export async function setStorageItem<T>(
  key: string,
  value: T,
): Promise<void> {
  await AsyncStorage.setItem(
    key,
    JSON.stringify(value),
  );
}

export async function getStorageItem<T>(
  key: string,
): Promise<T | null> {
  const data =
    await AsyncStorage.getItem(
      key,
    );

  if (!data) {
    return null;
  }

  return JSON.parse(data) as T;
}

export async function removeStorageItem(
  key: string,
): Promise<void> {
  await AsyncStorage.removeItem(
    key,
  );
}
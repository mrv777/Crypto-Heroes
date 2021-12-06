import { EncryptStorage } from 'encrypt-storage';

const encryptStorage = new EncryptStorage('secret-key', { prefix: 'CH' });

export const setToLocalStorage = (data: string | Object | boolean, key: string) => {
  const processed = typeof data === 'string' ? data : JSON.stringify(data);
  encryptStorage.setItem(processed, key);
};

export const getFromLocalStorage = (key: string): string | null => {
  const data = encryptStorage.getItem(key);

  let parsed;
  try {
    parsed = data ? JSON.parse(data) : null;
  } catch (err) {
    parsed = data;
  }

  return parsed;
};

export const removeItemFromStorage = (key: string) => {
  encryptStorage.removeItem(key);
};

// utils/localStorage.ts
import { Page } from './types';  // 適切なパスに修正してください

export const loadFromLocalStorage = (key: string): Page[] | undefined => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return undefined;
    return JSON.parse(serializedData) as Page[];
  } catch (err) {
    console.error("Error reading from local storage", err);
    return undefined;
  }
};

export const saveToLocalStorage = (key: string, data: Page[]): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error("Error saving to local storage", err);
  }
};

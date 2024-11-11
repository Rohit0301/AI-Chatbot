import { toast } from "react-toastify";

/**
 * Stores a value in the local storage with a specified key.
 * @param key - The key under which to store the value.
 * @param value - The value to store (will be serialized to JSON).
 */
export const setDataToStorage = (key: string, value: any): void => {
  try {
    const serializedValue: string = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    toast.error("Something went wrong while storing data");
    return;
  }
};

/**
 * Retrieves a value from local storage associated with a specified key.
 * @param key - The key of the value to retrieve.
 * @returns The retrieved value deserialized from JSON, or null if not found or on error.
 */
export const getDataFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    toast.error("Something went wrong while fetching data");
    return null;
  }
};
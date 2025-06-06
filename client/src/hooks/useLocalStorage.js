import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Failed to parse localStorage item", error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  const save = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  };

  const update = (updater) => {
    try {
      const updatedValue =
        typeof updater === "function" ? updater(storedValue) : updater;
      localStorage.setItem(key, JSON.stringify(updatedValue));
      setStoredValue(updatedValue);
    } catch (error) {
      console.error("Failed to update localStorage", error);
    }
  };

  const remove = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.error("Failed to remove from localStorage", error);
    }
  };

  return { value: storedValue, save, update, remove };
};

export default useLocalStorage;

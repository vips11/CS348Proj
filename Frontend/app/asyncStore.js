import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(`Error saving data for key ${key}: ${error}`);
  }
};

export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data !== null ? JSON.parse(data) : null;
  } catch (error) {
    console.log(`Error getting data for key ${key}: ${error}`);
    return null;
  }
};

export const userEmailKey = "userEmail";

export const getUserEmail = async () => {
  const res = getData(userEmailKey);
  return res;
};

export const saveUserEmail = async (email) => {
  await saveData(userEmailKey, email);
};

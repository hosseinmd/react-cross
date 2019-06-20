import { AsyncStorage as RNAsyncStorage } from "react-native-cross";
export const AsyncStorage = {
  async setItem(key, data) {
    try {
      await RNAsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  },
  async getItem(key) {
    try {
      let content = await RNAsyncStorage.getItem(key);
      if (content) {
        return JSON.parse(content);
      }
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  },
};

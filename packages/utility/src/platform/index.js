import { Platform } from "react-native";

export const platform = {
  ...Platform,
  isAndroid: Platform.OS === "android",
  isiOS: Platform.OS === "ios",
  isWeb: Platform.OS === "web",
};

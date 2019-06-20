import { Platform } from "react-native";
const isAndroid = Platform.OS === "android";
const isiOS = Platform.OS === "ios";
const isWeb = Platform.OS === "web";
export const platform = {
  ...Platform,
  isAndroid,
  isiOS,
  isWeb,
};

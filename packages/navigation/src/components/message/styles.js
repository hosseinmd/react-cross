import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
export default StyleSheet.create({
  message_container: {
    flex: 1,
    position: "absolute",
    overflow: "hidden",
    left: 0,
    right: 0,
    top: 0,
    paddingTop: getStatusBarHeight(true),
  },
});

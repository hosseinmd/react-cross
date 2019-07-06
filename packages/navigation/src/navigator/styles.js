import { StyleSheet } from "react-native";
import { platform } from "@react-cross/utility";
export default StyleSheet.create({
  container: {
    ...platform.select({
      web: {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      default: {
        flex: 1,
      },
    }),
    backgroundColor: "#fff",
  },
});

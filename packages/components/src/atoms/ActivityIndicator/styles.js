import { StyleSheet } from "react-native";
import { shadows } from "@react-cross/utility";
export default StyleSheet.create({
  indicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    ...shadows.depth4,
  },
});

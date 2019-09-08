import { StyleSheet, I18nManager } from "react-native";
export default StyleSheet.create({
  input: {
    textAlign: I18nManager.isRTL ? "right" : "left",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    height: 30,
  },
});

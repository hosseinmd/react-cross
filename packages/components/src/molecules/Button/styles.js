import { StyleSheet } from "react-native";
import { theme } from "../../customizeTheme";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button_title: {
    ...theme.typography.button,
  },
});

import { StyleSheet } from "react-native";
import { dimensions } from "@react-cross/utility";
import { Header } from "@react-cross/navigation";
import { theme } from "../../customizeTheme";

const { colors, typography } = theme;
export default StyleSheet.create({
  dialog: {
    borderRadius: 6,
    width: "100%",
    maxHeight: dimensions.height - Header.HEIGHT - 100,
    backgroundColor: colors.surface,
    margin: 45,
  },
  header: {
    height: 64,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  footer: {
    height: 52,
    padding: 4,
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },
  title_text: {
    ...typography.h6,
  },
  button_text: {
    ...typography.button,
    color: colors.primary,
  },
  bottom_border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.onSurface,
  },
  top_border: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.onSurface,
  },
});

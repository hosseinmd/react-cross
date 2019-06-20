import { StyleSheet } from "react-native";
import { platform } from "@react-cross/utility";

export default {
  button: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: platform.isAndroid ? 0.5 : 0.2,
    elevation: 3,
    borderWidth: platform.Version < 21 ? StyleSheet.hairlineWidth * 2 : 0,
    borderColor: "#00000033",
    shadowRadius: 4,
    shadowColor: "#000000",
  },
  surface: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: platform.isAndroid ? 0.5 : 0.2,
    elevation: 6,
    borderWidth: platform.Version < 21 ? StyleSheet.hairlineWidth * 2 : 0,
    borderColor: "#00000033",
    shadowRadius: 4,
    shadowColor: "#000000",
  },
  menu: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: platform.isAndroid ? 0.5 : 0.2,
    elevation: 12,
    shadowRadius: 4,
    shadowColor: "#000000",
  },
  statusBar: {
    borderColor: "#00000011",
    borderBottomWidth: StyleSheet.hairlineWidth * 4,
  },
};

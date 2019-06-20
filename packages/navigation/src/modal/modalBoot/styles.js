import { StyleSheet } from "react-native";
import config from "../../config"; //  using now visual code bug
import { platform } from "@react-cross/utility";
export default StyleSheet.create({
  modal_container: {
    overflow: "hidden",
    ...StyleSheet.absoluteFillObject,
    ...(platform.isiOS
      ? { paddingTop: config.isAppleStatusBarBig ? 41 : 20 }
      : { paddingTop: 0 })
  },
  ModalStatusBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "visible"
  },

  pageView: {
    flex: 1
  }
});

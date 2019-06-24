import { StyleSheet } from "react-native";
export default StyleSheet.create({
  modal_container: {
    overflow: "hidden",
    ...StyleSheet.absoluteFillObject,
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

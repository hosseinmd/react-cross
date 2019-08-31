import { StyleSheet } from "react-native";
export default StyleSheet.create({
  content_container: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: "hidden",
  },
  scroll_content_container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  background_container: {
    flex: 1,
  },
  handle: {
    flex: 1,
  },
});

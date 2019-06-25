import { StyleSheet } from "react-native";
import shadows from "../common/shadows";
export default StyleSheet.create({
  content_container: {
    ...shadows.menu,
    position: "absolute",
    width: "95%",
    borderRadius: 20,
    margin: 10,
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

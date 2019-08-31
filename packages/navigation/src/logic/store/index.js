import { createState } from "react-global-hook";
import actions from "../actions";
import { platform } from "@react-cross/utility";

const initialState = {
  /**@type {import("../../react-navigation").NavigationContainer} */
  appContainer: null,
};

export const [useGlobal, getGlobal] = createState(
  initialState,
  actions,
  // store => {
  //   if (platform.isWeb) {
  //     window.onpopstate = event => {
  //       // BackHandler.goBack(event);
  //     };
  //   }
  // }
);

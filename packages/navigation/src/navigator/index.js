import React, { memo, useEffect } from "react";
import styles from "./styles";
import { StatusBar, View } from "react-native";
import Message from "../components/message";
import Slider from "../slider";
import { action } from "../action";
import { platform } from "@react-cross/utility";
import { useGlobal } from "../logic/store";

const Navigator = memo(
  ({ statusBarContentColor, statusBarBackgroundColor }) => {
    const [state] = useGlobal(["appContainer"]);
    useEffect(() => {
      statusBarContentColor && StatusBar.setBarStyle(statusBarContentColor);
      platform.isAndroid &&
        statusBarBackgroundColor &&
        StatusBar.setBackgroundColor(statusBarBackgroundColor);
    }, []);
    const Navigation = state.appContainer;
    return (
      <View style={styles.container}>
        {Navigation && (
          <Navigation
            ref={navigatorRef => {

              action.navigation = navigatorRef._navigation;
            }}
          />
        )}
        <Slider />
        <Message />
      </View>
    );
  },
);
//
export default Navigator;

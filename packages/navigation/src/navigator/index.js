import React, { memo, useEffect } from "react";
import styles from "./styles";
import { BackHandler, StatusBar, View } from "react-native";
import Modal from "../modal";
import Message from "../components/message";
import Slider from "../slider";
import action from "../context/action";
import { platform } from "@react-cross/utility";
import { useGlobal } from "../logic/store";

const Navigator = memo(
  ({ statusBarContentColor, statusBarBackgroundColor }) => {
    const [state] = useGlobal(["appContainer"]);
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", action.hardwareBack);
      StatusBar.setBarStyle(statusBarContentColor);
      platform.isAndroid &&
        StatusBar.setBackgroundColor(statusBarBackgroundColor);
    }, []);
    const Navigation = state.appContainer;
    return (
      <View style={styles.container}>
        {Navigation && (
          <Navigation
            ref={navigatorRef => {
              action.navigation = navigatorRef;
            }}
          />
        )}
        <Modal />
        <Slider />
        <Message />
      </View>
    );
  }
);
//
export default Navigator;

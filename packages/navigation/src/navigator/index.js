import React from "react";
import styles from "./styles";
import { BackHandler, StatusBar, View } from "react-native";
import config from "../config";
import { PureComponent } from "../abstract";
import Modal from "../modal";
import Message from "../components/message";
import Slider from "../slider";
import back from "../utils/back";
import action from "../context/action";
import { platform } from "react-cross-utility";
class Navigator extends PureComponent {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", back.handler);
    StatusBar.setBarStyle(config.colorContent + "-content");
    // platform.isAndroid && StatusBar.setBackgroundColor(colors.surface);
  }

  render() {
    const Navigation = config.appNavigator;
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
}
//
export default Navigator;

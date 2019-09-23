import React, { memo, useEffect } from "react";
import styles from "./styles";
import { StatusBar, View } from "react-native";
import { action } from "../action";
import { platform } from "@react-cross/utility";
import { useGlobal } from "../logic/store";
import { BackHandler, Message } from "../components/atoms";

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
              if (navigatorRef) action.navigation = navigatorRef._navigation;
            }}
            onNavigationStateChange={(prevState, currentState) => {
              const currentComponent =
                BackHandler.subscribedComponents[
                  action.getCurrentRouteKey(currentState)
                ];
              const prevComponent =
                BackHandler.subscribedComponents[
                  action.getCurrentRouteKey(prevState)
                ];
              prevComponent && prevComponent(false);
              currentComponent && currentComponent(true);
            }}
          />
        )}
        <Message />
      </View>
    );
  },
);
//
export default Navigator;

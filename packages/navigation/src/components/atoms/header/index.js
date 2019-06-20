import React, { memo } from "react";
import { View } from "react-native";
import styles from "./styles";
import { useGlobal } from "../../../logic/store";

export const Header = memo(props => {
  const [state] = useGlobal(["navigationOptions"]);
  const navigationOptions = state.navigationOptions || {};
  console.log(navigationOptions);

  return (
    <View style={[styles.container, navigationOptions.headerStyle]}>
      {navigationOptions.headerLeft || <View/>}
      {navigationOptions.headerTitle || <View/>}
      {navigationOptions.headerRight || <View/>}
    </View>
  );
});

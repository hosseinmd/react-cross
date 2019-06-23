import {
  NavigationRouteConfigMap,
  NavigationContainer
} from "react-navigation";
import { Component, PureComponent } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { string } from "postcss-selector-parser";

type theme = "dark" | "light";
type language = { isRTL: Boolean; name: String };
interface modals {
  [key: string]: {
    component: String;
    NonWithdrawal: boolean;
    statusbar: String[];
  };
}

interface StackNavigatorParams {
  modals: modals;
  modals_statusbar: any;
  pages: NavigationRouteConfigMap;
  first_page: String;
  cardStyle: ViewStyle;
}
declare let config: {
  appNavigator: NavigationContainer;
  first_page: String;
  modals: modals;
  modals_statusbar: Object;
  slider: Object;
  pages: NavigationRouteConfigMap;
  createStackNavigator: (config: StackNavigatorParams) => undefined;

  isRTL: Boolean;
  language: {
    value: language;

    reduce: () => undefined;
  };
  theme: {
    value: String;
    reduce: () => undefined;
  };
  colorContent: String;
  submit: (language: language, theme: theme) => undefined;
  isAppleStatusBarBig: boolean;
};
export default config;

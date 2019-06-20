import {
  NavigationRouteConfigMap,
  NavigationContainer,
} from "react-navigation";
import { Component, PureComponent } from "react";
import { TextStyle, StyleSheet } from "react-native";

type theme = "dark" | "light";
const language = { isRTL: Boolean, name: String };
interface modals {
  [key: string]: {
    component: String,
    NonWithdrawal: boolean,
    statusbar: String[],
  };
}
type menu_content = Component | PureComponent;
interface typography {
  title: TextStyle;
  body: TextStyle;
  desc: TextStyle;
  note: TextStyle;
  [key: string]: TextStyle;
}
interface StackNavigatorParams {
  modals: modals;
  modals_statusbar: any;
  MenuContent: menu_content;
  typography: typography;
  pages: NavigationRouteConfigMap;
  first_page: String;
}
const config = {
  appNavigator: NavigationContainer,
  typography: typography,
  first_page: String,
  modals: modals,
  modals_statusbar: Object,
  slider: Object,
  pages: NavigationRouteConfigMap,
  menu_content: menu_content,
  createStackNavigator: (config: StackNavigatorParams) => undefined,

  isRTL: Boolean,
  language: {
    value: language,

    reduce: () => undefined,
  },
  theme: {
    reduce: () => undefined,
  },
  colorContent: String,
  submit: (language: language, theme: theme) => undefined,
  isAppleStatusBarBig: boolean,
};

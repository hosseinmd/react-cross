import enums from "../common/enums"; //never use common/index becuase color use config.theme
import { I18nManager, Easing, Animated, StyleSheet } from "react-native";
import { AsyncStorage } from "../logic/AsyncStorage";
import RNRestart from "react-native-restart";
import DeviceInfo from "react-native-device-info";
import { createAppContainer, createStackNavigator } from "./navigation";
import { platform } from "@react-cross/utility";
import Navigator from "../navigator";
function transitionConfig() {
  return {
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const thisSceneIndex = scene.index;
      const width = (I18nManager.isRTL ? -1 : 1) * layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      });

      return {
        transform: [{ translateX }],
      };
    },
  };
}
const config = {
  appNavigator: {},
  // first_page
  first_page: null,
  // typography
  modals: {},
  modals_statusbar: {},
  slider: {},
  pages: {},
  menu_content: null,
  // menu_content

  createStackNavigator({
    modals={},
    modals_statusbar={},
    pages,
    first_page,
    cardStyle = {},
  }) {
    this.modals = modals;
    this.modals_statusbar = modals_statusbar;
    this.pages = pages;
    this.first_page = first_page;
    this.appNavigator = createAppContainer(
      createStackNavigator(pages, {
        initialRouteName: first_page,
        headerMode: "float",
        cardStyle: {
          ...StyleSheet.absoluteFillObject,
          ...cardStyle,
        },
        transitionConfig,
      }),
    );
    return Navigator
  },

  get colorContent() {
    return this.theme == enums.THEME.LIGHT
      ? enums.THEME.DARK
      : enums.THEME.LIGHT;
  },
  get isRTL() {
    return I18nManager.isRTL;
  },

  language: {
    value: null,
    async reduce(defaultLanguage) {
      this.value = (await AsyncStorage.getItem("LANGUAGE")) || defaultLanguage;
      if (this.value.isRTL) {
        if (I18nManager.isRTL) {
          I18nManager.forceRTL(true);
        } else {
          I18nManager.forceRTL(true);
          !platform.isWeb && RNRestart.Restart();
        }
      } else I18nManager.forceRTL(false);
    },
    async set(language) {
      await AsyncStorage.setItem("LANGUAGE", language);
      I18nManager.forceRTL(language.isRTL);
    },
  },
  theme: {
    value: null,
    async reduce(defaultTheme) {
      this.value = (await AsyncStorage.getItem("THEME")) || defaultTheme;
    },
    async set(theme) {
      await AsyncStorage.setItem("THEME", theme);
      this.value = theme;
    },
  },

  async submit(language, theme) {
    await this.language.set(language);
    await this.theme.set(theme);

    platform.isWeb ? window.location.reload() : RNRestart.Restart();
  },

  get isAppleStatusBarBig() {
    const status_big = ["iPhone X", "iPhone XR", "iPhone XS Max", "iPhone XS"];
    const model = DeviceInfo.getModel();
    return status_big.includes(model);
  },
};

export default config;

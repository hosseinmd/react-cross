import enums from "../common/enums"; //never use common/index becuase color use config.theme
import { I18nManager } from "react-native";
import { AsyncStorage } from "../logic/AsyncStorage";
import RNRestart from "react-native-restart";
import { platform } from "@react-cross/utility";

const config = {
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
};

export default config;

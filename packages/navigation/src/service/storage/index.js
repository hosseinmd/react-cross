import { AsyncStorage } from "@react-cross/react-native";
import enums from "../../common/enums";

//AsyncStorage.clear();

class storage {
  getItem = async name => {
    try {
      let content = await AsyncStorage.getItem(name);
      if (content !== null) {
        content = JSON.parse(content);
      }
      return content;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  setItem = async (name, content) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(content));
    } catch (error) {
      console.log(error);
      // nothing
    }
  };
  removeItem = async name => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.log(error);
      // nothing
    }
  };
  Language = {
    list: async () => {
      const Language = await this.getItem(enums.STORAGE.LANGUAGE);
      return Language || enums.LANGUAGE.FARSI;
    },
    add: async Language => {
      this.setItem(enums.STORAGE.LANGUAGE, Language);
    },
  };
  theme = {
    list: async () => {
      const theme =
        (await this.getItem(enums.STORAGE.THEME)) || enums.THEME.LIGHT;
      return theme;
    },
    add: async theme => {
      await this.setItem(enums.STORAGE.THEME, theme);
    },
  };
}

export default new storage();

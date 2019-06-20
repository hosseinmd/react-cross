import { platform } from "../platform";
import { I18nManager } from "react-native";

const commonStyle = {
  ...platform.select({
    ios: {
      textAlign: I18nManager.isRTL ? "left" : "right",
    },
  }),
};
export const typography = {
  h1: {
    ...commonStyle,
    fontSize: 96,
  },
  h2: {
    ...commonStyle,
    fontSize: 60,
  },
  h3: {
    ...commonStyle,
    fontSize: 48,
  },
  h4: {
    ...commonStyle,
    fontSize: 34,
  },
  h5: {
    ...commonStyle,
    fontSize: 24,
  },
  h6: {
    ...commonStyle,
    fontSize: 20,
  },
  body: {
    ...commonStyle,
    fontSize: 16,
  },
  button: {
    ...commonStyle,
    fontSize: 14,
  },
  caption: {
    ...commonStyle,
    fontSize: 12,
  },
  overline: {
    ...commonStyle,
    fontSize: 10,
  },
};

/**
 * @param {{h1:{}, h2:{}, h3:{}, h4:{}, h5:{}, h6:{}, body:{}, button:{}, caption:{}, overline:{}}} typography
 */
export function assignToTypography(partialTypography) {
  for (const key in partialTypography) {
    if (partialTypography.hasOwnProperty(key)) {
      if (typeof partialTypography[key] == "object")
        Object.assign(typography[key], partialTypography[key]);
    }
  }
}

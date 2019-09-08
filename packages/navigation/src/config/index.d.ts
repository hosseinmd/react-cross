type theme = "dark" | "light";
type language = { isRTL: Boolean; name: String };

declare let config: {
  language: {
    value: language;

    reduce: () => undefined;
  };
  theme: {
    value: String;
    reduce: () => undefined;
  };
  submit: (language: language, theme: theme) => undefined;
};
export default config;

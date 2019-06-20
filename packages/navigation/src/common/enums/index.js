export default {
  LANGUAGE: {
    FARSI: "fa",
    ENGLISH: "en"
  },
  THEME: {
    DARK: "dark",
    LIGHT: "light"
  },
  PAGE_ANIM: {
    [true]: {
      //is rtl
      ADD: -400,
      DELETE: 400
    },
    [false]: {
      ADD: 400,
      DELETE: -400
    }
  },
  JETEMIT: {
    PAGE_CHANGE: "PAGE_CHANGE",
    MODAL: "MODAL",
    MODAL_HIDE: "MODAL_HIDE",
    MODAL_PROPS: "MODAL_PROPS",
    MODAL_SUBMIT_COLOR_CHANGE: "MODAL_SUBMIT_COLOR_CHANGE",
    MESSAGE: "MESSAGE",
    SLIDER: "SLIDER",
    CHANGE_MENU: "CHANGE_MENU"
  },

  STORAGE: {
    KEEP_STATE: "KEEP_STATE",
    STATE: "state",
    THEME: "theme",
    LANGUAGE: "language",
  },


  ICONS: {
    RADIO: {
      [true]: "radiobox-marked",
      [false]: "radiobox-blank"
    },
    CHECKBOX: {
      [true]: "checkbox-marked-outline",
      [false]: "checkbox-blank-outline"
    },
    BUY_CREDITE: "cellphone-message",
    PLUS: "plus"
  },
  MESSAGE: {
    TYPE: {
      ERROR: "error",
      WARNING: "warning",
      FINE: "fine"
    }
  },
};

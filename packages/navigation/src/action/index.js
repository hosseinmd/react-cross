import { enums } from "../common";
import { emit, on } from "jetemit";
import { NavigationActions, StackActions } from "../react-navigation";
import RNExitApp from "react-native-exit-app";

var _state = {
  page: [],
  backAction: null,
  modal: {},
  menu: false,
  message: null,
  page_anim: 0,
  event: {},
};
export const action = {
  /**
   * @typedef NavigationScreen
   * @type {import("../react-navigation").NavigationScreenProp<import("../react-navigation").NavigationState>}
   */

  /**@type {NavigationScreen} */
  navigation: null,

  /**
   * @private
   */
  _navigationIsEnable: true,

  throttle(func) {
    return function() {
      if (action._navigationIsEnable) {
        action._navigationIsEnable = false;
        func(arguments);
        setTimeout(function() {
          action._navigationIsEnable = true;
        }, 500);
      }
    };
  },
  /**
   * @param {NavigationScreen} navigation
   * @returns {boolean}
   */
  isDrawerOpen(navigation) {
    const parent = navigation.dangerouslyGetParent();
    return (
      parent &&
      parent.state &&
      (parent.state.isDrawerOpen ||
        parent.state.drawerMovementDirection === "opening") &&
      parent.state.drawerMovementDirection !== "closing"
    );
  },
  /**
   * @param {NavigationScreen} navigation
   * @returns {boolean}
   */
  getNavigationOptions: navigation => {
    const screenNavigation = {
      state: navigation.state.routes[navigation.state.index],
      dispatch: navigation.dispatch,
    };
    return navigation.router.getScreenOptions(screenNavigation);
  },

  /**
   * @param {import("../react-navigation").NavigationState} navigation
   * @returns {import("../react-navigation").NavigationRoute}
   */
  getActiveRoute(state) {
    if (state.routes != undefined && state.index != undefined)
      return action.getActiveRoute(state.routes[state.index]);
    else return state;
  },
  get state() {
    return _state;
  },
  set state(value) {
    _state = value;
  },
  exitApp() {
    RNExitApp.exitApp();
  },
  page: {
    set(name, props) {
      action.navigation.dispatch(
        NavigationActions.navigate({
          routeName: name,
          params: props,
        }),
      );
    },
    get() {
      return action.navigation.state.nav.routes[this.lastIndex()].routeName; //_state.page[_state.page.length - 1].name;
    },
    setBackAction: {
      pop(count) {
        _state.backAction = StackActions.pop({
          n: count,
        });
      },
      popToTop() {
        _state.backAction = StackActions.popToTop();
      },
    },
    delete(n = 1) {
      action.navigation.dispatch(
        _state.backAction ||
          StackActions.pop({
            n,
          }),
      );
      _state.backAction = null;
    },
    lastIndex() {
      return action.navigation.state.nav.index;
    },
    props: {
      get: () => {
        return action.navigation.state.nav.routes[action.page.lastIndex()]
          .params;
      },
      set(props) {
        action.navigation.dispatch(NavigationActions.setParams(props));
      },
    },
  },

  message: {
    TYPE_ERROR: "error",
    TYPE_WARNING: "warning",
    TYPE_FINE: "fine",
    show: (messageNode, timeout = 4000) => {
      emit(enums.JETEMIT.MESSAGE, messageNode);
      action.message.time = setTimeout(action.message.remove, timeout);
    },
    remove: () => {
      clearTimeout(action.message.time);
      emit(enums.JETEMIT.MESSAGE, false);
    },
  },
  set event(event) {
    _state.event = event;
  },
  get event() {
    return _state.event;
  },
};

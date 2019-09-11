import React, { memo, useMemo, useCallback, useEffect } from "react";
import { BackHandler as RNBackHandler } from "react-native";
import { action } from "../../../action";

/**
 * manage hardware back press
 * @class BackHandler
 * @typedef {object} props
 * @prop {()=> boolean} onBackPress
 * @prop {any} navigation
 * @extends {PureComponent<props>}
 */

export const BackHandler = memo(props => {
  const _handleNavigationChange = isCurrent => {
    if (isCurrent && !holder.isFocused) {
      didFocus();
      holder.isFocused = true;
      BackHandler.currentBackListener = onBackPressed;
    } else if (!isCurrent && holder.isFocused) {
      willBlur();
      holder.isFocused = false;
      BackHandler.currentBackListener = null;
    }
  };

  const holder = useMemo(() => {
    const key = props.navigation.state.key;
    BackHandler.subscribedComponents[key] = _handleNavigationChange;
    return { key };
  }, []);

  const didFocus = () => {
    RNBackHandler.addEventListener("hardwareBackPress", onBackPressed);
  };

  const willBlur = () => {
    RNBackHandler.removeEventListener("hardwareBackPress", onBackPressed);
  };

  const onBackPressed = useCallback(() => {
    return props.onBackPress();
  }, []);

  useEffect(() => {
    _handleNavigationChange(
      action.getActiveRoute(props.navigation.state).key == holder.key,
    );
    return () => {
      delete BackHandler.subscribedComponents[holder.key];
      RNBackHandler.removeEventListener("hardwareBackPress", onBackPressed);
    };
  }, []);

  return props.children || null;
});
BackHandler.subscribedComponents = {};
BackHandler.currentBackListener = null;

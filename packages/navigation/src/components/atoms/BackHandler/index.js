import React, { PureComponent } from "react";
import { BackHandler as RNBackHandler } from "react-native";

/**
 * manage hardware back press
 * @class BackHandler
 * @typedef {object} props
 * @prop {()=> boolean} onBackPress
 * @prop {any} navigation
 * @extends {PureComponent<props>}
 */

export class BackHandler extends PureComponent {
  static subscribedComponents = {};
  static currentBackListener = null;
  constructor(props) {
    super(props);
    BackHandler.subscribedComponents[
      this.props.navigation.state.key
    ] = this._handleNavigationChange;
  }
  didFocus = () => {
    RNBackHandler.addEventListener("hardwareBackPress", this.onBackPressed);
  };
  willBlur = () => {
    RNBackHandler.removeEventListener("hardwareBackPress", this.onBackPressed);
  };

  onBackPressed = () => {
    return this.props.onBackPress();
  };

  _handleNavigationChange = isCurrent => {
    if (isCurrent && !this.isFocused) {
      this.didFocus();
      this.isFocused = true;
      BackHandler.currentBackListener = this.onBackPressed;
    } else if (!isCurrent && this.isFocused) {
      this.willBlur();
      this.isFocused = false;
      BackHandler.currentBackListener = null;
    }
  };
  componentWillUnmount() {
    delete BackHandler.subscribedComponents[this.props.navigation.state.key];
    RNBackHandler.removeEventListener("hardwareBackPress", this.onBackPressed);
  }

  render() {
    return this.props.children || null;
  }
}

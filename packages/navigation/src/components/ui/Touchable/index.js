import React, { PureComponent } from "react";
import { TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import action from "../../../context/action";
import { platform } from "@react-cross/utility";
export default class Touchable extends PureComponent {
  onPress = event => {
    action.event = event.nativeEvent;
    if (this.props.onPress) window.requestAnimationFrame(this.props.onPress);
  };
  onLongPress = event => {
    action.event = event.nativeEvent;
    if (this.props.onLongPress)
      window.requestAnimationFrame(this.props.onLongPress);
  };
  render() {
    const { style, onPress, onLongPress, children, ...props } = this.props;

    return platform.isAndroid ? (
      <TouchableNativeFeedback
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        background={TouchableNativeFeedback.SelectableBackground()}
        {...props}
        onPress={this.onPress}
        onLongPress={this.onLongPress}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    ) : (
      <TouchableOpacity
        {...props}
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        style={style}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
//{this.getCurrentPage(state.currentPage)}

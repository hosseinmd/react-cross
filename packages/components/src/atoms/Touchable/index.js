import React, { memo, useCallback } from "react";
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { platform } from "@react-cross/utility";

/**
 * @typedef TouchableProps
 @type {
    import("react-native").TouchableOpacityProps & 
    import("react-native").TouchableNativeFeedbackProps & 
    {
      affect: boolean;
      enableBorderless: boolean;
    }
  }
 */

/**
 * @type {{ new(props: any): {
 * props: TouchableProps
 * }}
 */
export const Touchable = memo(
  ({
    style,
    enableBorderless,
    onPress,
    onLongPress,
    children,
    affect = true,
    ...lostProps
  }) => {
    const press = useCallback(
      event => {
        if (onPress) window.requestAnimationFrame(onPress);
      },
      [onPress],
    );
    const longPress = useCallback(
      event => {
        if (onLongPress) window.requestAnimationFrame(onLongPress);
      },
      [onLongPress],
    );

    const AndroidTouchable = affect
      ? TouchableNativeFeedback
      : TouchableWithoutFeedback;
    return platform.isAndroid ? (
      <AndroidTouchable
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        background={
          enableBorderless
            ? TouchableNativeFeedback.SelectableBackgroundBorderless()
            : TouchableNativeFeedback.SelectableBackground()
        }
        {...lostProps}
        onPress={press}
        onLongPress={longPress}
      >
        <View style={style}>{children}</View>
      </AndroidTouchable>
    ) : (
      <TouchableOpacity
        activeOpacity={affect ? 0.2 : 1}
        onPress={press}
        onLongPress={longPress}
        style={style}
        {...lostProps}
      >
        {children}
      </TouchableOpacity>
    );
  },
);

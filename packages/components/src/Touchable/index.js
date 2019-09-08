import React, { memo, useCallback } from "react";
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { platform, useFlattenStyle } from "@react-cross/utility";

/**
 * @typedef TouchableProps
 @type {
    import("react-native").TouchableOpacityProps & 
    import("react-native").TouchableNativeFeedbackProps & 
    {
      freeze: boolean;
      enableBorderless: boolean;
    }
  }
 */

/**
  @type {
    {
      new(props: any): {
         props: TouchableProps,
      },
    }
  }
 */
export const Touchable = memo(
  ({
    style,
    enableBorderless,
    onPress,
    onLongPress,
    children,
    freeze = false,
    ...lostProps
  }) => {
    const press = useCallback(
      event => onPress && window.requestAnimationFrame(onPress),
      [onPress],
    );

    const longPress = useCallback(
      event => onLongPress && window.requestAnimationFrame(onLongPress),
      [onLongPress],
    );

    const AndroidTouchable = freeze
      ? TouchableWithoutFeedback
      : TouchableNativeFeedback;

    return platform.isAndroid ? (
      (<AndroidTouchable
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
      </AndroidTouchable>)
    ) : (
      (<TouchableOpacity
        {...(freeze && { activeOpacity: 1 })}
        {...lostProps}
        onPress={press}
        onLongPress={longPress}
        style={style}
      >
        {children}
      </TouchableOpacity>)
    );
  },
);

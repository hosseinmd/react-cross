import React, { memo } from "react";
import styles from "./styles";
import { Touchable, Text } from "../../atom";
import { useFlattenStyle } from "@avahamrah/core/src/hooks";
import { ActivityIndicator } from "react-native";

/**
 * @typedef ButtonProps
  @type {import("react-native").ButtonProps & {
    disableBackgroundColor: string,
    onPress: Function,
    style: ViewStyle,
    textStyle: TextStyle,
    isLooding: boolean,
    color: string,
    size: "small" | "large",
    disabled: boolean,
  }}
 */

/**
 * @type {{ new(props: any): {
 * props: ButtonProps
 * }}
 */
export const Button = memo(
  ({
    onPress,
    children,
    style,
    isLooding,
    disableBackgroundColor = "gray",
    disableColor = "black",
    color,
    textStyle,
    size = "small",
    disabled,
    ...props
  }) => {
    color = disabled ? disableColor : color;

    const flatten_text_style = useFlattenStyle(
      [styles.button_title, textStyle, color ? { color } : null],
      [textStyle, color],
    );

    const flatten_container = useFlattenStyle(
      [
        styles.container,
        style,
        disabled ? { backgroundColor: disableBackgroundColor } : null,
      ],
      [disabled, style],
    );
    return (
      <Touchable
        {...props}
        disabled={disabled}
        onPress={onPress}
        style={flatten_container}
      >
        {isLooding ? (
          <ActivityIndicator color={color} size={size} animating={true} />
        ) : typeof children == "string" ? (
          <Text style={flatten_text_style}>{children}</Text>
        ) : (
          children
        )}
      </Touchable>
    );
  },
);

import React, { memo, forwardRef, useMemo } from "react";
import { TextInput as RNTextInput } from "react-native";
import styles from "./styles";
import { platform, useFlattenStyle } from "@react-cross/utility";
import { theme } from "../../customizeTheme";

/**
 * @typedef {import("react-native").TextInputProps} TextInputProps
 */

/**
 * @type {{ new(props: any): {
 * props: TextInputProps
 * }}
 */
const TextInput = memo(
  forwardRef(({ style, keyboardType, ...lostProps }, forwardedRef) => {
    const flattenStyles = useFlattenStyle([styles.input, style], [style]);
    const platformBaseProps = useMemo(
      () =>
        platform.select({
          web: {
            keyboardType: keyboardType == "numeric" ? "default" : keyboardType,
          },
          default: {
            keyboardType,
          },
        }),
      [keyboardType],
    );
    return (
      <RNTextInput
        multiline={false}
        ref={forwardedRef}
        numberOfLines={1}
        underlineColorAndroid="transparent"
        placeholderTextColor={theme.colors.placeholder}
        returnKeyType="next"
        style={flattenStyles}
        {...lostProps}
        {...platformBaseProps}
      />
    );
  }),
);
export default TextInput;

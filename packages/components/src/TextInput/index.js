import React, { memo, forwardRef, useMemo } from "react";
import { TextInput as RNTextInput } from "react-native";
import styles from "./styles";
import { platform, useFlattenStyle } from "@react-cross/utility";

/**
 * @typedef {import("react-native").TextInputProps} TextInputProps
 */

/**
 *
  @type {
    {
      new(props: any): {
         props: TextInputProps,
      },
    }
  }
 */
export const TextInput = memo(
  forwardRef(({ style, keyboardType, ...restProps }, forwardedRef) => {
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
    return ((
      <RNTextInput
        multiline={false}
        ref={forwardedRef}
        numberOfLines={1}
        underlineColorAndroid="transparent"
        returnKeyType="next"
        style={flattenStyles}
        {...restProps}
        {...platformBaseProps}
      />
    ));
  }),
);

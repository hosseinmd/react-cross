import React, { memo, forwardRef } from "react";
import { Text as RNText } from "react-native";
import { theme } from "../../customizeTheme";
import { useFlattenStyle } from "@react-cross/utility";

/**
 * @typedef {import("react-native").TextProps} TextProps
 */

/**
 * @type {{ new(props: any): {
 * props: TextProps
 * }}
 */
const Text = memo(
  forwardRef(({ style, ...restProps }, forwardedRef) => {
    const flattenStyles = useFlattenStyle(
      [{ ...theme.typography.body2 }, style],
      [style],
    );
    return <RNText ref={forwardedRef} {...restProps} style={flattenStyles} />;
  }),
);
export default Text;

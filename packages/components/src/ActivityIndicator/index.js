import React, { memo } from "react";
import { ActivityIndicator as RNActivityIndicator } from "react-native";
import styles from "./styles";

/**
 * @typedef ActivityIndicatorProps
 * @type {import("react-native").ActivityIndicatorProps}
 */

/**
 * @type {{ new(props: any): {
 * props: ActivityIndicatorProps
 * }}
 */
export const ActivityIndicator = memo(({ style, ...props }) => {
  return <RNActivityIndicator style={[styles.indicator, style]} {...props} />;
});

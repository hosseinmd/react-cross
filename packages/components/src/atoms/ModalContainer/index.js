import React, { memo } from "react";
import styles from "./styles";
import { View, TouchableOpacity } from "react-native";
import { theme } from "../../customizeTheme";

/**
 * @typedef ModalContainerProps
 * @type {object}
 * @property {Function} closeDialog
 * @property {string} shadeColor
 * @property {number} shadeOpacity
 * @property {React.ReactElement} children
 */

/**
 * @type {{ new(props: any): {
 * props: ModalContainerProps
 * }}
 */
export const ModalContainer = memo(
  ({
    closeDialog,
    children,
    shadeColor = theme.colors.background,
    shadeOpacity = 0.4,
  }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={closeDialog}
          style={[
            styles.background,
            { backgroundColor: shadeColor, opacity: shadeOpacity },
          ]}
        />
        {children}
      </View>
    );
  },
);

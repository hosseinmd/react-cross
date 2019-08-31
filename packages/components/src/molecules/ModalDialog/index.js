import React, { memo } from "react";
import styles from "./styles";
import { View, ScrollView } from "react-native";
import { Touchable, Text, ModalContainer } from "../../atoms";
import { useFlattenStyles } from "@cinflex/core/src/hooks";

/**
 * @typedef ModalDialogProps
  @type {{
    title: string,
    closeDialog: Function,
    buttons: Array<object>,
    type: "confirmation" | "alert" | "simple",
    contentContainerStyle: ViewStyle,
    ListHeaderComponent: React.ReactElement,
  }}
 */

/**
 * @type {{ new(props: any): {
 * props: ModalDialogProps
 * }}
 */
export const ModalDialog = memo(
  ({
    closeDialog,
    title,
    children,
    buttons,
    type = "confirmation",
    contentContainerStyle,
    ListHeaderComponent,
  }) => {
    const flattenStyles = useFlattenStyles(
      () => ({
        title_container: [
          styles.header,
          type == "confirmation" && styles.bottom_border,
        ],
        buttons_container: [
          styles.footer,
          type == "confirmation" && styles.top_border,
        ],
        container: [styles.dialog, contentContainerStyle],
      }),
      [type],
    );

    return (
      <ModalContainer closeDialog={closeDialog}>
        <View style={flattenStyles.container}>
          {title ? (
            <View style={flattenStyles.title_container}>
              <Text style={styles.title_text}>{title}</Text>
            </View>
          ) : (
            undefined
          )}
          {ListHeaderComponent}
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
          {buttons ? (
            <View style={flattenStyles.buttons_container}>
              {buttons.map((button, index) => (
                <Touchable
                  key={index}
                  style={styles.button}
                  onPress={button.onPress}
                >
                  <Text style={styles.button_text}>{button.title}</Text>
                </Touchable>
              ))}
            </View>
          ) : (
            undefined
          )}
        </View>
      </ModalContainer>
    );
  },
);

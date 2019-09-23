import React, { useState, useEffect, memo } from "react";
import { LayoutAnimation } from "react-native";
import styles from "./styles";
import { enums } from "../../../common";
import { action } from "../../../action";
import { Header } from "../../../react-navigation";
import { Touchable } from "@react-cross/components";
import { on } from "jetemit";

export const Message = memo(() => {
  const [MessageComponent, setMessage] = useState(null);

  useEffect(() => {
    return on(enums.JETEMIT.MESSAGE, message => {
      LayoutAnimation.easeInEaseOut();
      setMessage(message);
    });
  }, []);

  return (
    <Touchable
      style={[
        styles.message_container,
        {
          height: MessageComponent ? Header.HEIGHT : 0,
        },
      ]}
      onPress={action.message.remove}
    >
      {MessageComponent}
    </Touchable>
  );
});

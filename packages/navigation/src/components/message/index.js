import React from "react";
import { PureComponent } from "../../abstract";
import { LayoutAnimation } from "react-native";
import styles from "./styles";
import { enums } from "../../common";
import action from "../../context/action";
import { Touchable } from "../ui";
import { Header } from "react-navigation-stack";

export default class Message extends PureComponent {
  state = {
    message: false,
  };
  componentDidMount() {
    this.listener(enums.JETEMIT.MESSAGE, message => {
      LayoutAnimation.easeInEaseOut();
      this.setState({ message });
    });
  }

  render() {
    const MessageComponent = this.state.message;
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
  }
}

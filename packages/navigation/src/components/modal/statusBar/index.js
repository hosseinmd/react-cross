import React, { PureComponent } from "react";
import styles from "./styles";
import { View } from "react-native";
import config from "../../../config";
class statusbar extends PureComponent {
  render() {
    const { items } = this.props;
    return (
      <View style={styles.container}>
        {items.map((item, index) => {
          const Component = config.modals_statusbar[item];
          return <Component key={index} />;
        })}
      </View>
    );
  }
}

export default statusbar;

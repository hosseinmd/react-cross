import React, { PureComponent } from "react";
import styles from "./styles";
import { View } from "react-native";
import { getGlobal } from "../../../logic/store";
class statusbar extends PureComponent {
  render() {
    const { items } = this.props;
    const [state] = getGlobal();
    return (
      <View style={styles.container}>
        {items.map((item, index) => {
          const Component = state.modals_statusbar[item];
          return <Component key={index} />;
        })}
      </View>
    );
  }
}

export default statusbar;

import React, { Fragment, PureComponent } from "react";
import {
  PanResponder,
  ScrollView,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import styles from "./styles";
import { dimensions } from "@react-cross/utility";

/**
 * ios slide behavior for all platform
 * @class
 * @typedef {object} props
 * @prop {()=> void} close
 * @prop {string} shadowsColor
 * @prop {boolean} enableTapClose
 * @prop {boolean} height
 * @prop {import("react-native").ViewStyle} contentContainerStyle
 * @extends {PureComponent<props>}
 */
export class SliderContainer extends PureComponent {
  state = {
    y: 0,
  };
  vy = 0;
  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { dy } = gestureState;
      if (dy >= 15) {
        return true;
      }
      return false;
    },
    onPanResponderMove: (evt, gestureState) => {
      const { dy, vy } = gestureState;
      this.vy = (this.vy + vy) / 2;
      if (dy <= 0) this.setState({ y: 0 });
      else {
        this.setState({ y: dy / 2 });
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      const { dy, vy } = gestureState;

      if (dy * this.vy * 4 <= dimensions.height / 2) {
        this.goBeginPoint();
      } else this.close();
    },
  });

  goBeginPoint = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ y: 0 });
  };
  close = () => {
    if (this.props.close) this.props.close();
    else this.goBeginPoint();
  };
  render() {
    const {
      contentContainerStyle,
      shadowsColor,
      children,
      enableTapClose,
    } = this.props;
    return (
      <Fragment>
        <View
          {...this._panResponder.panHandlers}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.background_container}
          style={[
            styles.background,
            { backgroundColor: shadowsColor || "#00000077" },
          ]}
        >
          {enableTapClose ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.close}
              style={styles.background_container}
            />
          ) : null}
        </View>
        <View
          {...this._panResponder.panHandlers}
          style={[
            styles.content_container,
            {
              bottom: -this.state.y,
              height: "60%",
            },
            contentContainerStyle,
          ]}
        >
          <ScrollView
            style={{
              top: this.state.y / 2,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll_content_container}
          >
            {children}
          </ScrollView>
        </View>
      </Fragment>
    );
  }
}

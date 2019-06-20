import React, { Fragment } from "react";
import {
  PanResponder,
  ScrollView,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import styles from "./styles";
import { enums, dimensions } from "../common";
import { PureComponent } from "../abstract";
import action from "../context/action";
import config from "../config";

export default class Slider extends PureComponent {
  state = {
    slider: false,
    y: 0,
  };
  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { dy } = gestureState;
      if (dy >= 15) {
        return true;
      }
      return false;
    },
    onPanResponderMove: (evt, gestureState) => {
      const { dy } = gestureState;
      if (dy <= 0) this.setState({ y: 0 });
      else {
        this.setState({ y: dy / 2 });
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      const { dy } = gestureState;
      if (dy <= dimensions.height / 4) {
        this.goBeginPoint();
      } else this.close();
    },
  });

  goBeginPoint = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ y: 0 });
  };
  close = () => {
    if (config.slider[this.state.slider.name].NonWithdrawal)
      this.goBeginPoint();
    else action.slider.close();
  };
  componentDidMount() {
    this.listener(enums.JETEMIT.SLIDER, slider => {
      LayoutAnimation.easeInEaseOut();
      this.setState({ slider, y: 0 });
    });
  }
  render() {
    const slider = this.state.slider;
    const ContentComponent = slider && config.slider[slider.name].component;
    const shadowsColor = slider && config.slider[slider.name].shadowsColor;
    const backgroundColor =
      slider && config.slider[slider.name].backgroundColor;

    return (
      <Fragment>
        {slider ? (
          <View
            {...this._panResponder.panHandlers}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.background_container}
            style={[
              styles.background,
              { backgroundColor: shadowsColor || "#00000077" },
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.close}
              style={styles.background_container}
            />
          </View>
        ) : null}
        <View
          {...this._panResponder.panHandlers}
          style={[
            styles.content_container,
            {
              backgroundColor: backgroundColor || "#fff",
              bottom: slider ? -this.state.y : 0,
              height: slider ? "60%" : 0,
            },
          ]}
        >
          {ContentComponent ? (
            <ScrollView
              style={{
                top: this.state.y / 2,
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll_content_container}
            >
              <ContentComponent {...slider.props} />
            </ScrollView>
          ) : null}
        </View>
      </Fragment>
    );
  }
}

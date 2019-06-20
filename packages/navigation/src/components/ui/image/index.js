import React, { PureComponent } from "react";
import { Image as RNImage, ActivityIndicator, View } from "react-native";
import { colors } from "../../../common";

export default class Image extends PureComponent {
  // img = {
  // 	default: require('../../../assets/image/logo/shadow.png')
  // }
  state = {
    loading: true
  };
  onLoadEnd = () => {
    this.setState({ loading: false });
  };
  render() {
    const { style, resizeMode, indicatorColor, ...props } = this.props;
    // if (!props.source.uri)
    // 	props.source = this.img.default
    return (
      <View>
        <RNImage
          style={style}
          {...props}
          resizeMode={resizeMode || "cover"}
          onLoadEnd={this.onLoadEnd}
        />
        <ActivityIndicator
          color={indicatorColor}
          size="large"
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          animating={this.state.loading}
        />
      </View>
    );
  }
}

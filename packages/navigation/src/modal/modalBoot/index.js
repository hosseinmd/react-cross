import React from "react";
import { enums, dimensions } from "../../common";
import action from "../../context/action";
import styles from "./styles";
import ModalStatusBar from "../../components/modal/statusBar";
import { Animated, View } from "react-native";
import { PureComponent } from "../../abstract";
import config from "../../config";
import { getGlobal } from "../../logic/store";

class ModalBoot extends PureComponent {
  event = {
    x: (action.event.pageX || 0) - dimensions.width / 2,
    y: (action.event.pageY || 0) - dimensions.height / 2,
  };
  anim = new Animated.Value(0);
  _bound() {
    return ["hide"];
  }
  hide(id) {
    if (this.props.modal.id == id)
      Animated.timing(this.anim, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }).start(function() {
        action.modal.remove(id);
      });
  }
  componentDidMount() {
    Animated.spring(this.anim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    this.listener(enums.JETEMIT.MODAL_HIDE, this.hide);
  }
  render() {
    const [state] = getGlobal();

    const modal = this.props.modal;
    const ModalComponent = state.modals[modal.name].component;
    return (
      <Animated.View
        style={[
          styles.modal_container,
          {
            transform: [
              {
                translateX: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.event.x, 0],
                }),
              },
              {
                translateY: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.event.y, 0],
                }),
              },
              {
                scale: this.anim,
              },
            ],
            opacity: this.anim,
            borderRadius: this.anim.interpolate({
              inputRange: [0, 1],
              outputRange: [300, 0],
            }),
          },
        ]}
      >
        <View style={{ flex: 1, position: "relative" }}>
          <View style={styles.pageView}>
            <ModalComponent id={this.props.modal.id} />
          </View>
          {state.modals[modal.name].statusbar && (
            <View style={styles.ModalStatusBar}>
              <ModalStatusBar items={state.modals[modal.name].statusbar} />
            </View>
          )}
        </View>
      </Animated.View>
    );
  }
}
//
export default ModalBoot;

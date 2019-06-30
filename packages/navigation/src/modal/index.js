import React from "react";
import ModalBoot from "./modalBoot";
import { PureComponent } from "../abstract";
import { enums } from "../common";
import config from "../config";
import { getGlobal } from "../logic/store";
class Modal extends PureComponent {
  state = {
    modal: [],
    __updateCount__: 0,
  };
  componentDidMount() {
    this.listener(enums.JETEMIT.MODAL, modal => {
      //LayoutAnimation.easeInEaseOut();
      this.setState(function(state) {
        return {
          modal,
          __updateCount__: state.__updateCount__ + 1,
        };
      });
    });
  }
  render() {
    const [state] = getGlobal();
    return this.state.modal.map(
      value =>
        state.modals[value.name] && <ModalBoot modal={value} key={value.id} />,
    );
  }
}
//
export default Modal;

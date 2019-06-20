import action from "../context/action";
import config from "../config";
import RNExitApp from "react-native-exit-app";
class BackHandler {
  handler = () => {
    if (action.slider.get()) {
      const { NonWithdrawal } = config.slider[action.slider.get().name];
      if (NonWithdrawal) {
        RNExitApp.exitApp();
      } else action.slider.close();
    } else if (!!action.modal.get()) {
      const { NonWithdrawal } = config.modals[action.modal.get().name];
      if (!NonWithdrawal) action.modal.hide();
    } else if (action.menu.get()) {
      action.menu.close();
    } else if (config.pages[action.page.get()].screen.backHandler) {
      config.pages[action.page.get()].screen.backHandler();
    } else if (action.page.get() == config.first_page) {
      this.exitApp();
    } else {
      this.goBack();
    }
    return true;
  };
  exitApp() {
    RNExitApp.exitApp();
  }
  goBack() {
    action.page.delete();
  }
}

export default new BackHandler();

import { createAppContainer as RNcreateAppContainer } from "./mainSource";
import { getGlobal } from "../../logic/store";
import Navigator from "../../navigator";
import config from "../../config";
export default function createAppContainer(
  Component,
  { modals = {}, modals_statusbar = {} },
) {
  config.modals = modals;
  config.modals_statusbar = modals_statusbar;
  const appContainer = RNcreateAppContainer(Component);
  const [, actions] = getGlobal();
  actions.setAppContainer({ appContainer, modals, modals_statusbar });
  return Navigator;
}

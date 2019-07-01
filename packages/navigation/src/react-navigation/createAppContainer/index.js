import { createAppContainer as RNcreateAppContainer } from "./mainSource";
import { getGlobal } from "../../logic/store";
import Navigator from "../../navigator";
import config from "../../config";
export default function createAppContainer(Component) {
  const appContainer = RNcreateAppContainer(Component);
  const [, actions] = getGlobal();
  actions.setAppContainer({ appContainer });
  return Navigator;
}

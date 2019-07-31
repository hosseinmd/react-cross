import { createAppContainer as RNcreateAppContainer } from "./mainSource";
import { getGlobal } from "../../logic/store";
import Navigator from "../../navigator";
export default function createAppContainer(Component) {
  const appContainer = RNcreateAppContainer(Component);
  const [, actions] = getGlobal();
  actions.setAppContainer({ appContainer });
  return Navigator;
}
export function createContainer(Component) {
  return RNcreateAppContainer(Component);
}

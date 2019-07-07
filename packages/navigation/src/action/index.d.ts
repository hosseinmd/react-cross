import { NavigationScreenProp, NavigationState } from "../react-navigation";

export namespace action {
  const navigation: NavigationScreenProp<NavigationState>;
  function isDrawerOpen(): boolean
  const state: {}
  function exitApp(): void
  const page: {
    set:(name: string, props: {})=> void,
    get:()=>string,
    setBackAction: {
      pop(count: number): void,
      popToTop(): void,
    },
    delete(n: 1 | number): void,
    lastIndex(): void,
  };
  const slider: {
    open(name: string, props: {}): void,
    close(): string,
    get(): {},
  };

  const message: {
    TYPE_ERROR: "error",
    TYPE_WARNING: "warning",
    TYPE_FINE: "fine",
    show: (messageNode: Node, timeout: 4000 | number) => void,
    remove: () => void,
  };
}

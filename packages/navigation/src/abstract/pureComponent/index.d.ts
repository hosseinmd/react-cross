import React from "react";
type unsubscribe = () => void;

declare class PureComponent extends React.PureComponent {
  _bound(): Array<string>;
  listener(name: string, callBack: (arg: any) => void): unsubscribe;
  set unsubscribes(unsubscribe: unsubscribe);
  set timeout(timeout: number);
  set interval(interval: number);

  clearIntervals(): void;
  clearTimeouts(): void;
  clearSubscribes(): void;
  clearAllRunable(): void;
}
export default PureComponent;

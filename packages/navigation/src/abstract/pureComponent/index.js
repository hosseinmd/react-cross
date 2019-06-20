import { PureComponent as RNPureComponent } from "react";
import { on } from "jetemit";

export default class PureComponent extends RNPureComponent {
  constructor(props) {
    super(props);
    this.__unsubscribes__ = [];
    this.__timeout__ = [];
    this.__interval__ = [];
    this._bound &&
      this._bound().map(value => {
        this[value] = this[value].bind(this);
      });
  }
  listener(name, callBack) {
    return (this.unsubscribes = on(name, callBack));
  }
  set unsubscribes(unsubscribe) {
    this.__unsubscribes__.push(unsubscribe);
    return unsubscribe;
  }
  set timeout(timeout) {
    this.__timeout__.push(timeout);
  }

  set interval(interval) {
    this.__interval__.push(interval);
  }
  clearIntervals() {
    this.__interval__.forEach(function(interval) {
      clearInterval(interval);
    });
  }
  clearTimeouts() {
    this.__timeout__.forEach(function(timeout) {
      clearTimeout(timeout);
    });
  }
  clearSubscribes() {
    this.__unsubscribes__.forEach(function(unsubscribe) {
      unsubscribe();
    });
  }
  componentWillUnmount() {
    this.clearSubscribes();
    this.clearAllRunable();
  }
  clearAllRunable() {
    this.clearTimeouts();
    this.clearIntervals();
  }
}

import PureComponent from "../pureComponent";

export default class Page extends PureComponent {
  constructor(props) {
    super(props);

    this.unsubscribes = this.props.navigation.addListener("didBlur", () => {
      this.clearAllRunable();
      this.forceUpdate();
      this.didBlur && this.didBlur();
    }).remove;

    this.unsubscribes = this.props.navigation.addListener("willBlur", () => {
      this.willBlur && this.willBlur();
    }).remove;
    this.unsubscribes = this.props.navigation.addListener("didFocus", () => {
      this.didFocus && this.didFocus();
    }).remove;

    this.unsubscribes = this.props.navigation.addListener("willFocus", () => {
      this.forceUpdate();
      this.willFocus && this.willFocus();
    }).remove;
  }
}
